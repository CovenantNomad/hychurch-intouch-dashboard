import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {useCallback, useEffect, useState} from "react";
import {db} from "../../client/firebaseConfig";
import {AgeSegmentedGroup} from "../../interface/community.types";
import {COMMUNITY_COLLCTION} from "../../interface/firebase";

export function useAgeSegmentedGroups() {
  const [groups, setGroups] = useState<AgeSegmentedGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const ref = collection(
        db,
        COMMUNITY_COLLCTION.COMMUNITY,
        COMMUNITY_COLLCTION.AGE,
        COMMUNITY_COLLCTION.COMMUNITIES,
      );

      // ✅ 인덱스 이슈 피하려고 where 없이 가져온 후 클라 필터/정렬
      const q = query(ref, orderBy("order", "asc"));
      const snap = await getDocs(q);

      const list = snap.docs
        .map((d) => {
          const data = d.data() as Partial<AgeSegmentedGroup>;
          return {
            id: d.id,
            name: String(data.name ?? d.id),
            order: Number(data.order ?? 0),
            isActive: Boolean(data.isActive ?? true),
          };
        })
        .filter((g) => g.isActive);

      setGroups(list);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "알 수 없는 오류";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {groups, loading, error, refresh: fetchGroups};
}
