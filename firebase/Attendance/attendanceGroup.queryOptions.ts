import {QueryKey} from "react-query";
import {GroupPlan} from "../../interface/attendance";
import {fetchGroupAttendanceReal} from "./fetchGroupAttendance";

export function groupAttendanceQueryKey(
  group: GroupPlan,
  refDate: string,
): QueryKey {
  return [
    "attendanceGroup",
    group.cheongNumber,
    refDate,
    group.cellIds,
  ] as const;
}

export function groupAttendanceQueryOptions(group: GroupPlan, refDate: string) {
  return {
    queryKey: groupAttendanceQueryKey(group, refDate),
    queryFn: () => fetchGroupAttendanceReal({group, refDate}),
    staleTime: 10 * 60 * 1000,
    cacheTime: 24 * 60 * 60 * 1000,
  };
}
