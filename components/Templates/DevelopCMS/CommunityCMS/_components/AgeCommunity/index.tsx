import {useEffect, useMemo, useRef, useState} from "react";
import graphlqlRequestClient from "../../../../../../client/graphqlRequestClient";
import {FIND_CELL_LIMIT} from "../../../../../../constants/constant";
import {saveAgeSegmentedAssignments} from "../../../../../../firebase/Community/saveAgeSegmentedAssignments";
import {
  FindCellListsQuery,
  FindCellListsQueryVariables,
  useFindCellListsQuery,
} from "../../../../../../graphql/generated";
import {useAgeSegmentedGroupCells} from "../../../../../../hooks/AgedSegmentedCommunity/useAgeSegmentedGroupCells";
import {useAgeSegmentedGroups} from "../../../../../../hooks/AgedSegmentedCommunity/useAgeSegmentedGroups";
import {getCommonCellList} from "../../../../../../utils/cellUtils";
import CellListPanel from "./_components/CellListPanel";
import CommunityPanel from "./_components/CommunityPanel";

type Assignments = Record<string, string[]>; // groupId -> cellIds

const AgeCommunity = () => {
  const [editMode, setEditMode] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>("");
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);
  const [pendingRebuild, setPendingRebuild] = useState(false);

  const initialSnapshotRef = useRef<{
    assignments: Assignments;
    unassigned: string[];
  } | null>(null);

  const {data, isLoading, isError, error, refetch} = useFindCellListsQuery<
    FindCellListsQuery,
    FindCellListsQueryVariables
  >(
    graphlqlRequestClient,
    {limit: FIND_CELL_LIMIT},
    {staleTime: 60 * 60 * 1000, cacheTime: 60 * 60 * 1000 * 24},
  );

  const filteredList = useMemo(() => {
    const nodes = data?.findCells.nodes ?? [];

    return getCommonCellList(nodes);
  }, [data]);

  const cellMap = useMemo(() => {
    const map = new Map<string, {id: string; name: string}>();
    for (const c of filteredList) {
      map.set(String(c.id), {id: String(c.id), name: String(c.name)});
    }
    return map;
  }, [filteredList]);

  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
    refresh: refreshGroups,
  } = useAgeSegmentedGroups();
  const {
    cellsByGroup,
    loading: groupCellsLoading,
    error: groupCellsError,
    refresh: refreshGroupCells,
  } = useAgeSegmentedGroupCells(groups);

  // --- 3) Step4: 로컬 배치 상태 ---
  const [assignments, setAssignments] = useState<Assignments>({});
  const [unassigned, setUnassigned] = useState<string[]>([]);

  // UI 선택 상태 (클릭 기반 최소 UX)
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // 서버 상태를 “처음 1번만” 로컬 상태에 반영
  const initializedRef = useRef(false);

  const buildInitialFromServer = () => {
    // groupId -> cellIds[]
    const next: Assignments = Object.fromEntries(
      groups.map((g) => [g.id, [] as string[]]),
    );

    // 서버에 저장된 group cells를 로컬 상태로
    const assignedSet = new Set<string>();
    for (const g of groups) {
      const list = cellsByGroup[g.id] ?? [];
      const ids = list
        .map((x) => String(x.cellId))
        .filter((id) => cellMap.has(id));
      next[g.id] = ids;
      ids.forEach((id) => assignedSet.add(id));
    }

    const allIds = Array.from(cellMap.keys());
    const nextUnassigned = allIds.filter((id) => !assignedSet.has(id));

    initialSnapshotRef.current = {
      assignments: next,
      unassigned: nextUnassigned,
    };

    setAssignments(next);
    setUnassigned(nextUnassigned);
    setSelectedCellId(null);
    setSelectedGroupId(null);
    setDirty(false);
    setEditMode(false);
  };

  useEffect(() => {
    // 그룹/셀/목록 로드가 끝났고 아직 초기화 안 했으면 1회 초기화
    if (initializedRef.current) return;
    if (groupsLoading || groupCellsLoading || isLoading) return;
    if (!groups.length) return; // 그룹이 없으면 초기화할 게 없음(Seed 먼저)
    if (cellMap.size === 0) return;

    buildInitialFromServer();
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    groupsLoading,
    groupCellsLoading,
    isLoading,
    groups.length,
    cellMap.size,
  ]);

  // --- 4) 로컬 편집 액션 ---
  const addSelectedToGroup = () => {
    if (!selectedCellId || !selectedGroupId) return;
    moveCellToGroup(selectedCellId, selectedGroupId);
    setSelectedCellId(null);
  };

  const removeFromGroup = (groupId: string, cellId: string) => {
    if (!editMode) return;

    setAssignments((prev) => ({
      ...prev,
      [groupId]: (prev[groupId] ?? []).filter((id) => id !== cellId),
    }));
    setUnassigned((prev) => (prev.includes(cellId) ? prev : [cellId, ...prev]));

    setDirty(true);
  };

  const onSave = async () => {
    if (!dirty || saving) return;

    setSaving(true);
    setSaveError("");

    try {
      // 1) Firestore 저장
      await saveAgeSegmentedAssignments({
        assignments,
        unassignedIds: unassigned,
        cellMap,
      });

      setPendingRebuild(true);

      // 2) Firestore 최신 데이터 다시 로드
      await refreshGroups();
      await refreshGroupCells();

      // 3) UI 상태 정리
      setDirty(false);
      setEditMode(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "알 수 없는 오류";
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  };

  const moveCellToGroup = (cellId: string, groupId: string) => {
    if (!editMode) return;

    // 셀이 미배치 목록에 없으면(이미 다른 그룹에 있을 수도 있음)도 이동 가능하게
    setAssignments((prev) => {
      const next: Assignments = {...prev};

      // 모든 그룹에서 제거(중복 방지)
      for (const gid of Object.keys(next)) {
        next[gid] = (next[gid] ?? []).filter((id) => id !== cellId);
      }

      // 대상 그룹에 추가(맨 뒤)
      next[groupId] = [...(next[groupId] ?? []), cellId];

      return next;
    });

    // 미배치에서도 제거
    setUnassigned((prev) => prev.filter((id) => id !== cellId));

    setDirty(true);
  };

  useEffect(() => {
    if (!pendingRebuild) return;

    // refresh가 끝나고 최신 값이 state에 반영된 타이밍
    const done = !groupsLoading && !groupCellsLoading && groups.length > 0;

    if (!done) return;

    buildInitialFromServer();
    setPendingRebuild(false);
  }, [pendingRebuild, groupsLoading, groupCellsLoading, groups.length]);

  const totalAssigned = useMemo(() => {
    return Object.values(assignments).reduce((sum, ids) => sum + ids.length, 0);
  }, [assignments]);

  const isBooting = groupsLoading || groupCellsLoading || isLoading;

  const locked = saving;

  return (
    <div className="w-full">
      {/* 상단 컨트롤 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">
            나이별 공동체 배치 (Step 4)
          </div>
          <div className="mt-1 text-sm text-gray-500">
            전체 {cellMap.size} / 배치 {totalAssigned} / 미배치{" "}
            {unassigned.length} / 변경 {dirty ? "있음" : "없음"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            셀 새로고침
          </button>

          <button
            onClick={() => setEditMode((v) => !v)}
            disabled={isBooting}
            className={`rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 ${
              editMode
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {editMode ? "수정 모드 종료" : "수정하기"}
          </button>

          <button
            onClick={buildInitialFromServer}
            disabled={isBooting}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            리셋(서버 기준)
          </button>

          <button
            onClick={onSave}
            disabled={!dirty || saving || isBooting}
            className="rounded-md border border-gray-900 bg-gray-900 px-3 py-1.5 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </div>

      {/* 에러 */}
      {isError && (
        <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error instanceof Error ? error.message : String(error)}
        </div>
      )}
      {(groupsError || groupCellsError) && (
        <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {groupsError ? `그룹 오류: ${groupsError}` : null}
          {groupsError && groupCellsError ? <br /> : null}
          {groupCellsError ? `그룹 셀 오류: ${groupCellsError}` : null}
        </div>
      )}
      {saveError && (
        <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          저장 오류: {saveError}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {/* LEFT */}
        <div className="col-span-4 md:col-span-1">
          <CellListPanel
            isLoading={isLoading}
            cellMap={cellMap}
            unassignedIds={unassigned}
            selectedCellId={selectedCellId}
            onSelectCell={setSelectedCellId}
            editMode={editMode}
            onDragStartCell={(cellId) => setSelectedCellId(cellId)}
          />

          {/* Step4 최소 UX: 선택 셀 + 선택 그룹 + 추가 버튼 */}
          <div className="mt-3 rounded-lg border border-gray-200 p-3">
            <div className="text-sm font-medium">배치</div>

            <div className="mt-2 grid grid-cols-1 gap-2">
              <select
                value={selectedGroupId ?? ""}
                onChange={(e) => setSelectedGroupId(e.target.value || null)}
                disabled={!editMode || isBooting}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
              >
                <option value="">그룹 선택</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <button
                onClick={addSelectedToGroup}
                disabled={!editMode || !selectedCellId || !selectedGroupId}
                className="rounded-md border border-gray-900 bg-gray-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                선택 셀을 그룹에 추가
              </button>

              <div className="text-xs text-gray-500">
                수정 모드에서만 동작. 저장은 Step 5에서 추가.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-4 md:col-span-3">
          <CommunityPanel
            groups={groups}
            assignments={assignments}
            cellMap={cellMap}
            editMode={editMode}
            onRemoveCell={removeFromGroup}
            loading={groupsLoading || groupCellsLoading}
            onDropCell={(groupId, cellId) => moveCellToGroup(cellId, groupId)}
            dragOverGroupId={dragOverGroupId}
            onDragOverGroup={setDragOverGroupId}
            locked={locked}
          />
        </div>
      </div>
    </div>
  );
};

export default AgeCommunity;
