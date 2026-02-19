import {GroupPlan} from "../../interface/attendance";
import {AgeSegmentedGroup} from "../../interface/community.types";

type CellsByGroup = Record<string, Array<{cellId: string; cellName: string}>>;

export function buildPlanFromFirebase(params: {
  groups: AgeSegmentedGroup[];
  cellsByGroup: CellsByGroup;
}): GroupPlan[] {
  const {groups, cellsByGroup} = params;

  const plan: GroupPlan[] = groups
    .map((g) => {
      const cellIds = (cellsByGroup[g.id] ?? [])
        .map((x) => Number(x.cellId))
        .filter((n) => Number.isFinite(n));

      return {
        cheongNumber: Number(g.order ?? 0), // ✅ 1~8
        groupName: g.name, // ✅ "1청" 등
        cellIds,
      };
    })
    .filter((p) => p.cheongNumber > 0)
    .sort((a, b) => a.cheongNumber - b.cheongNumber);

  return plan;
}
