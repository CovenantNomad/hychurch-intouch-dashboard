import {useMemo} from "react";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import {
  CellLeaderAttendanceSubmissionStatus,
  CheckCellAttendanceSubmissionsQuery,
  CheckCellAttendanceSubmissionsQueryVariables,
  useCheckCellAttendanceSubmissionsQuery,
} from "../graphql/generated";
//types
import {AttendanceSubmissionType} from "../interface/attendance";
import {isSpecialCellId, sortCommunityLabel} from "../utils/utils";

const useCheckCellAttendanceSubmissions = (attendanceDate: string) => {
  const {
    isLoading: isDataLoading,
    isFetching,
    data,
  } = useCheckCellAttendanceSubmissionsQuery<
    CheckCellAttendanceSubmissionsQuery,
    CheckCellAttendanceSubmissionsQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: attendanceDate,
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: Boolean(attendanceDate),
    },
  );

  const isLoading = isDataLoading || isFetching;

  const {attendanceStatus, communities, communityKeys, specialCells} =
    useMemo(() => {
      const submissions = data?.cellAttendanceCheckSubmissions ?? [];
      if (submissions.length === 0) {
        return {
          attendanceStatus: false,
          communities: {} as Record<string, AttendanceSubmissionType[]>,
          communityKeys: [] as string[],
          specialCells: [] as AttendanceSubmissionType[],
        };
      }

      const special: AttendanceSubmissionType[] = [];
      const common: AttendanceSubmissionType[] = [];

      for (const cell of submissions) {
        if (isSpecialCellId(cell.cellId)) special.push(cell);
        else common.push(cell);
      }

      // community 라벨(예: "빛1") 기준으로 그룹핑
      const grouped: Record<string, AttendanceSubmissionType[]> = {};

      for (const cell of common) {
        const key = cell.cellCommunity?.trim() || "미분류";
        (grouped[key] ??= []).push(cell);
      }

      // 각 그룹 내부 정렬
      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => a.cellName.localeCompare(b.cellName, "ko"));
      });

      // 그룹 키(커뮤니티 라벨) 정렬
      const keys = Object.keys(grouped).sort(sortCommunityLabel);

      const attendanceStatus = common.every(
        (cell) =>
          cell.submissionStatus ===
          CellLeaderAttendanceSubmissionStatus.Complete,
      );

      return {
        attendanceStatus,
        communities: grouped,
        communityKeys: keys,
        specialCells: special,
      };
    }, [data]);

  return {
    isLoading,
    attendanceStatus,
    communities, // Record<string, AttendanceSubmissionType[]>
    communityKeys, // 렌더링 순서에 쓰기 좋음
    specialCells,
  };
};

export default useCheckCellAttendanceSubmissions;
