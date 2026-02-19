import {useQueries} from "react-query";
import {groupAttendanceQueryOptions} from "../firebase/Attendance/attendanceGroup.queryOptions";
import {CheongSheetData, GroupPlan} from "../interface/attendance";

export function useAttendanceGroups(params: {
  plan: GroupPlan[]; // Firebase 기반 plan
  refDate: string;
  enabled?: boolean;
}) {
  const {plan, refDate, enabled = true} = params;

  const results = useQueries(
    plan.map((group) => ({
      ...groupAttendanceQueryOptions(group, refDate),
      enabled,
    })),
  );

  const isLoading = results.some((r) => r.isLoading);
  const isFetching = results.some((r) => r.isFetching);
  const isError = results.some((r) => r.isError);

  // ✅ 모두 성공한 것만 모아서 다운로드에 바로 넣을 수 있게
  const dataByCheong = results
    .map((r) => r.data)
    .filter((v): v is CheongSheetData => !!v);

  return {
    results,
    isLoading,
    isFetching,
    isError,
    dataByCheong,
  };
}
