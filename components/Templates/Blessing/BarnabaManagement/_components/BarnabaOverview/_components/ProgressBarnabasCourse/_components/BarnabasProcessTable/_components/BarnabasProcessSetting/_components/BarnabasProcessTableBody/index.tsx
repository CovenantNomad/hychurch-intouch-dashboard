import {useQuery} from "react-query";
import BarnabasProcessSetting from "../..";
import {getAppointmentByMatchingId} from "../../../../../../../../../../../../../../firebase/Barnabas/barnabas";
import {
  TAppointmentStatus,
  TMatching,
  TMatchingStatus,
} from "../../../../../../../../../../../../../../interface/barnabas";
import {
  convertAppointmentMessage,
  convertMatchingMessage,
} from "../../../../../../../../../../../../../../utils/utils";

type Props = {
  barnabas: TMatching;
};

const BarnabasProcessTableBody = ({barnabas}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
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

  return (
    <div className="grid grid-cols-11 text-sm text-center items-center hover:bg-gray-50">
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.matchingDate}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.barnabaName}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.menteeName}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        <span
          className={`text-white px-2 py-1 rounded-full ${
            barnabas.status === TMatchingStatus.COMPLETED
              ? "bg-blue-500"
              : barnabas.status === TMatchingStatus.PROGRESS
              ? "bg-teal-500"
              : barnabas.status === TMatchingStatus.PENDING
              ? "bg-gray-600"
              : "bg-amber-500"
          }`}
        >
          {convertMatchingMessage(barnabas.status)}
        </span>
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.completedMeetingCount}주차 / {barnabas.scheduledMeetingCount}
        주차
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {barnabas.lastMeetingDate || "일정없음"}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {isLoading || isFetching
          ? "만남일정 로딩중..."
          : data
          ? data.date
          : "일정없음"}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {isLoading || isFetching
          ? "만남일정 로딩중..."
          : data
          ? `${data.hour}:${data.minute}`
          : "일정없음"}
      </div>
      <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
        {isLoading || isFetching
          ? "만남일정 로딩중..."
          : data
          ? data.place
          : "일정없음"}
      </div>
      <div
        className={`h-10 col-span-1 flex items-center justify-center border-r border-gray-300`}
      >
        <span
          className={`px-2 py-1 rounded-full ${
            data?.status === TAppointmentStatus.COMPLETED
              ? "bg-blue-500 text-white"
              : data?.status === TAppointmentStatus.SCHEDULED
              ? "bg-teal-500 text-white"
              : data?.status === TAppointmentStatus.CANCELED
              ? "bg-amber-500 text-white"
              : "bg-black text-white"
          }`}
        >
          {isLoading || isFetching
            ? "만남일정 로딩중..."
            : data
            ? convertAppointmentMessage(data.status)
            : "일정없음"}
        </span>
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
