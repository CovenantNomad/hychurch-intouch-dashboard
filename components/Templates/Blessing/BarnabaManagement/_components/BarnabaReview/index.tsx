import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import {useMemo} from "react";
import {useQuery} from "react-query";
import {getAllMeetingReivews} from "../../../../../../firebase/Barnabas/barnabas";
import {GroupedAppointments} from "../../../../../../interface/barnabas";
import SkeletonTable from "../../../../../Atoms/Skeleton/SkeletonTable";
import MeetingReviewTable from "./_components/MeetingReviewTable";

type Props = {};

const BarnabaReview = ({}: Props) => {
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getAllMeetingReivews"],
    () => getAllMeetingReivews(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // matchingId별로 그룹화
  const groupedAppointments = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc, appointment) => {
      if (!acc[appointment.matchingId]) {
        acc[appointment.matchingId] = [];
      }
      acc[appointment.matchingId].push(appointment);
      return acc;
    }, {} as GroupedAppointments);
  }, [data]); // ✅ data가 변경될 때만 다시 계산

  // 그룹별 최신 week을 찾고, 그룹별도 최신일자 기준으로 정렬
  const sortedGroupedAppointments = useMemo(() => {
    return Object.values(groupedAppointments)
      .map((group) => ({
        latestDate: Math.max(
          ...group.map((item) => new Date(item.date).getTime())
        ), // 가장 최신 날짜
        appointments: group,
      }))
      .sort((a, b) => b.latestDate - a.latestDate) // 최신 날짜 순 정렬
      .map((group) => group.appointments);
  }, [groupedAppointments]); // ✅ groupedAppointments가 변경될 때만 실행

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="ext-lg font-semibold">바나바 만남후기 게시판</h4>
            <div className="flex items-center">
              {isFetching && (
                <span className="animate-pulse text-xs mr-4">
                  새로고침 중..
                </span>
              )}
              <button
                onClick={() => refetch()}
                className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
              >
                새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
          <div>
            {isLoading ? (
              <SkeletonTable />
            ) : data ? (
              <MeetingReviewTable
                sortedGroupedAppointments={sortedGroupedAppointments}
              />
            ) : (
              <div className="h-32 flex flex-col justify-center items-center space-y-1">
                <ExclamationTriangleIcon className="h-6 w-6" />
                <span className="text-sm text-gray-500">
                  현재 작성된 만남후기가 없습니다.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarnabaReview;
