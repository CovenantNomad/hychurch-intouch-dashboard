import dayjs from "dayjs";
import {useQuery} from "react-query";
import {
  getBarnabasCourseByStatus,
  getMenteeAttendanceByDate,
} from "../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../interface/barnabas";

type Props = {
  recentSunday: dayjs.Dayjs;
};

export const useBarnabasCourseWithAttendance = ({recentSunday}: Props) => {
  const {
    data: progressCourses,
    isLoading: isLoadingProgress,
    isFetching: isFetchingProgress,
  } = useQuery(
    ["getBarnabasCourseByStatus", TMatchingStatus.PROGRESS],
    () => getBarnabasCourseByStatus(TMatchingStatus.PROGRESS),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {
    data: pendingCourses,
    isLoading: isLoadingPending,
    isFetching: isFetchingPending,
  } = useQuery(
    ["getBarnabasCourseByStatus", TMatchingStatus.PENDING],
    () => getBarnabasCourseByStatus(TMatchingStatus.PENDING),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {
    data: attendances,
    isLoading: isLoadingAttendance,
    isFetching: isFetchingAttendance,
    refetch,
  } = useQuery(
    ["getMenteeAttendanceByDate", dayjs(recentSunday).format("YYYY-MM-DD")],
    () => getMenteeAttendanceByDate(dayjs(recentSunday).format("YYYY-MM-DD")),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const isLoading =
    isLoadingProgress || isLoadingPending || isLoadingAttendance;

  const isFetching =
    isFetchingProgress || isFetchingPending || isFetchingAttendance;

  if (isLoading) {
    return {isLoading: true, isFetching, data: [], refetch};
  }

  const mergedCourses = [...(progressCourses || []), ...(pendingCourses || [])];

  const mergedData = mergedCourses.map((matching) => {
    const attendance = attendances?.find(
      (att) => att.menteeId === matching.menteeId
    );

    return {
      matchingId: matching.id,
      barnabaName: matching.barnabaName,
      menteeName: matching.menteeName,
      status: matching.status, // 진행 상태 포함
      service: attendance ? attendance.service : "미제출",
      description: attendance?.description || "",
    };
  });

  return {isLoading: false, isFetching, data: mergedData, refetch};
};
