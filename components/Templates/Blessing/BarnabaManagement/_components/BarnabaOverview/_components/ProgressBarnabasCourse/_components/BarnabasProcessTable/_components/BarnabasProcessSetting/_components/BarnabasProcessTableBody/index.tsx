import {ArrowPathIcon} from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import {useQuery} from "react-query";
import BarnabasProcessSetting from "../..";
import {getAppointmentByMatchingId} from "../../../../../../../../../../../../../../firebase/Barnabas/barnabas";
import {
  TAppointmentStatus,
  TMatching,
} from "../../../../../../../../../../../../../../interface/barnabas";
import {getWeeksBetweenDates} from "../../../../../../../../../../../../../../utils/dateUtils";
import {
  convertAppointmentMessage,
  getDelayedWeeks,
} from "../../../../../../../../../../../../../../utils/utils";

type Props = {
  barnabas: TMatching;
};

const BarnabasProcessTableBody = ({barnabas}: Props) => {
  const {isLoading, data, refetch} = useQuery(
    ["getAppointmentByMatchingId", barnabas.id],
    () =>
      getAppointmentByMatchingId(barnabas.id, barnabas.completedMeetingCount),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled:
        !!barnabas.id &&
        barnabas.completedMeetingCount !== barnabas.scheduledMeetingCount,
    }
  );

  const delayedWeeks = getDelayedWeeks({
    matchingDate: barnabas.matchingDate,
    lastMeetingDate: barnabas.lastMeetingDate,
    completedMeetingCount: barnabas.completedMeetingCount,
    scheduledMeetingCount: barnabas.scheduledMeetingCount,
  });

  return (
    <div className="grid grid-cols-12 text-sm text-center items-center hover:bg-gray-50">
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.matchingDate}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.barnabaName}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.menteeName}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {getWeeksBetweenDates(
          barnabas.matchingDate,
          dayjs().format("YYYY-MM-DD")
        )}
        주
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.completedMeetingCount}주차 / {barnabas.scheduledMeetingCount}
        주차
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.lastMeetingDate || "일정없음"}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.completedMeetingCount ===
        barnabas.scheduledMeetingCount ? null : (
          <div className="flex flex-col">
            <p>{Number(barnabas.completedMeetingCount) + 1}주차</p>
            {delayedWeeks && (
              <p className="text-xs text-rose-500 ml-2">
                (다음약속지연: {delayedWeeks}주)
              </p>
            )}
          </div>
        )}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.completedMeetingCount ===
        barnabas.scheduledMeetingCount ? null : isLoading ? (
          <span>만남일정 로딩중...</span>
        ) : data ? (
          <p>
            {data.date} <br />
            {data.hour}:{data.minute}
          </p>
        ) : (
          <span>일정없음</span>
        )}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.completedMeetingCount ===
        barnabas.scheduledMeetingCount ? null : isLoading ? (
          <span>만남일정 로딩중...</span>
        ) : data ? (
          <span>{data.place}</span>
        ) : (
          <span>일정없음</span>
        )}
      </div>
      <div
        className={`h-12 col-span-1 flex items-center justify-center border-r border-gray-300`}
      >
        {barnabas.completedMeetingCount ===
        barnabas.scheduledMeetingCount ? null : (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              data?.status === TAppointmentStatus.COMPLETED
                ? "bg-blue-500 text-white"
                : data?.status === TAppointmentStatus.SCHEDULED
                ? "bg-teal-500 text-white"
                : data?.status === TAppointmentStatus.CANCELED
                ? "bg-amber-500 text-white"
                : "bg-black text-white"
            }`}
          >
            {isLoading
              ? "만남일정 로딩중..."
              : data
              ? convertAppointmentMessage(data.status)
              : "일정없음"}
          </span>
        )}
      </div>
      <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
        <button
          onClick={() => refetch()}
          className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
        >
          새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center">
        <BarnabasProcessSetting
          matchingId={barnabas.id}
          barnabaId={barnabas.barnabaId}
          barnabaName={barnabas.barnabaName}
          menteeName={barnabas.menteeName}
          menteeId={barnabas.menteeId}
          status={barnabas.status}
          completedMeetingCount={barnabas.completedMeetingCount}
        />
      </div>
    </div>
  );
};

export default BarnabasProcessTableBody;
