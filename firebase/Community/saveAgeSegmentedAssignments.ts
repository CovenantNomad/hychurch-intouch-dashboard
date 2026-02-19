import {doc, getDoc, serverTimestamp, writeBatch} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {COMMUNITY_COLLCTION} from "../../interface/firebase";

type CellInfo = {id: string; name: string};
type Assignments = Record<string, string[]>;

export type SaveAgeSegmentedAssignmentsInput = {
  assignments: Assignments;
  unassignedIds: string[]; // 로컬에서 미배치로 남긴 셀들(그룹에서 제거된 셀 포함)
  cellMap: Map<string, CellInfo>; // id->name
};

const groupCellRef = (groupId: string, cellId: string) => {
  return doc(
    db,
    COMMUNITY_COLLCTION.COMMUNITY,
    COMMUNITY_COLLCTION.AGE,
    COMMUNITY_COLLCTION.COMMUNITIES,
    groupId,
    COMMUNITY_COLLCTION.COMMUNITY_LIST,
    cellId,
  );
};

const cellIndexRef = (cellId: string) => {
  return doc(
    db,
    COMMUNITY_COLLCTION.COMMUNITY,
    COMMUNITY_COLLCTION.AGE,
    COMMUNITY_COLLCTION.CELL_INDEX,
    cellId,
  );
};

const chunk = <T>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

export async function saveAgeSegmentedAssignments({
  assignments,
  unassignedIds,
  cellMap,
}: SaveAgeSegmentedAssignmentsInput) {
  // 1) targetGroupByCellId 계산
  const targetGroupByCellId = new Map<string, string>(); // cellId -> groupId
  Object.entries(assignments).forEach(([groupId, ids]) => {
    ids.forEach((cellId) => targetGroupByCellId.set(cellId, groupId));
  });

  // 2) 저장 대상 셀 집합(그룹 배치된 것 + 미배치된 것)
  const targetIds = Array.from(targetGroupByCellId.keys());
  const merged = targetIds.concat(unassignedIds);
  const idsToConsider = Array.from(new Set<string>(merged)).filter((id) =>
    cellMap.has(id),
  );

  // 3) 현재 cellIndex(이전 그룹) 읽기
  const prevGroupByCellId = new Map<string, string | null>();

  // 너무 커지면 여기서 동시성 제한 걸면 좋지만, Step5에선 단순하게
  await Promise.all(
    idsToConsider.map(async (cellId) => {
      const snap = await getDoc(cellIndexRef(cellId));
      const prev = snap.exists()
        ? (snap.data().groupId as string | undefined)
        : undefined;
      prevGroupByCellId.set(cellId, prev ?? null);
    }),
  );

  // 4) Write Plan 만들기
  type WriteItem =
    | {
        kind: "UPSERT_ACTIVE";
        cellId: string;
        groupId: string;
        cellName: string;
        prevGroupId: string | null;
      }
    | {
        kind: "DEACTIVATE_PREV_AND_CLEAR_INDEX";
        cellId: string;
        prevGroupId: string;
      };

  const plan: WriteItem[] = [];

  for (const cellId of idsToConsider) {
    const targetGroupId = targetGroupByCellId.get(cellId) ?? null;
    const prevGroupId = prevGroupByCellId.get(cellId) ?? null;
    const cell = cellMap.get(cellId);

    if (!cell) continue;

    // 그룹에 배치된 경우
    if (targetGroupId) {
      plan.push({
        kind: "UPSERT_ACTIVE",
        cellId,
        groupId: targetGroupId,
        cellName: cell.name,
        prevGroupId,
      });
      continue;
    }

    // 미배치인 경우: 이전 그룹이 있으면 비활성화 + index 제거
    if (!targetGroupId && prevGroupId) {
      plan.push({
        kind: "DEACTIVATE_PREV_AND_CLEAR_INDEX",
        cellId,
        prevGroupId,
      });
    }
  }

  // 5) Batch 저장 (한 batch에 500 writes 제한 → 여유있게 350)
  // UPSERT 1개당 보통 2~3 writes(현재그룹 set + index set + 이전그룹 비활성화)
  // 그래서 plan 단위 chunk를 더 작게 잡음
  const batches = chunk(plan, 120);

  for (const batchItems of batches) {
    const b = writeBatch(db);

    for (const item of batchItems) {
      if (item.kind === "UPSERT_ACTIVE") {
        // 현재 그룹에 업서트
        b.set(
          groupCellRef(item.groupId, item.cellId),
          {
            cellId: item.cellId,
            cellName: item.cellName,
            isActive: true,
            updatedAt: serverTimestamp(),
          },
          {merge: true},
        );

        // reverse index
        b.set(
          cellIndexRef(item.cellId),
          {
            cellId: item.cellId,
            groupId: item.groupId,
            updatedAt: serverTimestamp(),
          },
          {merge: true},
        );

        // 이전 그룹이 다르면 이전 그룹 문서 비활성화
        if (item.prevGroupId && item.prevGroupId !== item.groupId) {
          b.set(
            groupCellRef(item.prevGroupId, item.cellId),
            {
              isActive: false,
              updatedAt: serverTimestamp(),
            },
            {merge: true},
          );
        }
      }

      if (item.kind === "DEACTIVATE_PREV_AND_CLEAR_INDEX") {
        // 이전 그룹 문서 비활성화
        b.set(
          groupCellRef(item.prevGroupId, item.cellId),
          {
            isActive: false,
            updatedAt: serverTimestamp(),
          },
          {merge: true},
        );

        // index 삭제
        b.delete(cellIndexRef(item.cellId));
      }
    }

    await b.commit();
  }

  return {
    totalConsidered: idsToConsider.length,
    totalPlan: plan.length,
  };
}
