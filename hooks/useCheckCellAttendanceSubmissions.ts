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
import {COMMUNITY_NAMES, SpecialCellIdType} from "../interface/cell";

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
    }
  );

  const isLoading = isDataLoading || isFetching;

  const {attendanceStatus, communities, specialCells} = useMemo(() => {
    if (!data || !data.cellAttendanceCheckSubmissions) {
      return {attendanceStatus: false, communities: {}, specialCells: []};
    }

    const commonCells: AttendanceSubmissionType[] = [];
    const specialCells: AttendanceSubmissionType[] = [];

    data.cellAttendanceCheckSubmissions.forEach((cell) => {
      if (
        cell.cellId.includes(SpecialCellIdType.NewFamily) ||
        cell.cellId.includes(SpecialCellIdType.Blessing) ||
        cell.cellId.includes(SpecialCellIdType.Renew)
      ) {
        specialCells.push(cell);
      } else {
        commonCells.push(cell);
      }
    });

    const sortedCommunities = Object.keys(COMMUNITY_NAMES).reduce(
      (acc, key) => {
        acc[key as keyof typeof COMMUNITY_NAMES] = [];
        return acc;
      },
      {} as Record<keyof typeof COMMUNITY_NAMES, AttendanceSubmissionType[]>
    );

    // 공동체 데이터 정리
    commonCells.forEach((cell) => {
      const communityKey = Object.entries(COMMUNITY_NAMES).find(
        ([_, communityName]) => communityName === cell.cellCommunity
      )?.[0] as keyof typeof COMMUNITY_NAMES | undefined;

      if (communityKey) {
        sortedCommunities[communityKey].push(cell);
      }
    });

    // 각 공동체별 정렬 적용
    Object.keys(sortedCommunities).forEach((key) => {
      sortedCommunities[key as keyof typeof COMMUNITY_NAMES].sort((a, b) =>
        a.cellName.localeCompare(b.cellName, "ko")
      );
    });

    const attendanceStatus = commonCells.every(
      (cell) =>
        cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete
    );

    return {attendanceStatus, communities: sortedCommunities, specialCells};
  }, [data]);

  return {
    isLoading,
    attendanceStatus,
    ...communities,
    specialCells,
  };
};

export default useCheckCellAttendanceSubmissions;
