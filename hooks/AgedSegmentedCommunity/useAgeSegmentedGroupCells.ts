import {collection, getDocs} from "firebase/firestore";
import {useCallback, useEffect, useMemo, useState} from "react";
import {db} from "../../client/firebaseConfig";
import {AgeSegmentedGroup} from "../../interface/community.types";
import {COMMUNITY_COLLCTION} from "../../interface/firebase";

type GroupCell = {
  cellId: string;
  cellName: string;
  isActive?: boolean;
};

type GroupCellsMap = Record<string, Array<{cellId: string; cellName: string}>>;

export function useAgeSegmentedGroupCells(groups: AgeSegmentedGroup[]) {
  const [cellsByGroup, setCellsByGroup] = useState<GroupCellsMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const groupIdsKey = useMemo(
    () => groups.map((g) => g.id).join("|"),
    [groups],
  );

  const fetchCells = useCallback(async () => {
    if (!groups.length) {
      setCellsByGroup({});
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await Promise.all(
        groups.map(async (g) => {
          const ref = collection(
            db,
            COMMUNITY_COLLCTION.COMMUNITY,
            COMMUNITY_COLLCTION.AGE,
            COMMUNITY_COLLCTION.COMMUNITIES,
            g.id,
            COMMUNITY_COLLCTION.COMMUNITY_LIST,
          );
          const snap = await getDocs(ref);

          const list = snap.docs
            .map((d) => d.data() as Partial<GroupCell>)
            .filter((x) => x.cellId && x.cellName)
            .filter((x) => x.isActive !== false)
            .map((x) => ({
              cellId: String(x.cellId),
              cellName: String(x.cellName),
            }))
            .sort((a, b) => a.cellName.localeCompare(b.cellName));

          return [g.id, list] as const;
        }),
      );

      const map: GroupCellsMap = {};
      for (const [groupId, list] of results) map[groupId] = list;
      setCellsByGroup(map);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "알 수 없는 오류";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [groups, groupIdsKey]);

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  return {cellsByGroup, loading, error, refresh: fetchCells};
}
