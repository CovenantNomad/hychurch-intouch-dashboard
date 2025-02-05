import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getAllMeetingsByMatchingId} from "../../../../../../../firebase/Barnabas/barnabas";
import {convertAppointmentMessage} from "../../../../../../../utils/utils";
import Skeleton from "../../../../../../Atoms/Skeleton/Skeleton";

type Props = {
  matchingId: string;
};

const MenteeBarnabasMeetings = ({matchingId}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getAllMeetingsByMatchingId", matchingId],
    () => getAllMeetingsByMatchingId(matchingId),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: !!matchingId,
    }
  );

  return (
    <div>
      {isLoading || isFetching ? (
        <Skeleton />
      ) : data && data.length !== 0 ? (
        <div>
          <div className="flex justify-between border divide-x rounded-tl-lg rounded-tr-lg">
            <div className="flex-1 text-center py-2 bg-gray-100">일자</div>
            <div className="flex-1 text-center py-2 bg-gray-100">시간</div>
            <div className="flex-1 text-center py-2 bg-gray-100">장소</div>
            <div className="flex-1 text-center py-2 bg-gray-100">만남상태</div>
          </div>
          {data.map((meeting, index) => (
            <div
              key={meeting.appointmentId}
              className={`flex justify-between border-l border-r border-b divide-x ${
                index === data.length - 1 && "rounded-bl-lg rounded-br-lg"
              }`}
            >
              <div className="flex-1 text-center py-2">{meeting.date}</div>
              <div className="flex-1 text-center py-2">
                {meeting.hour}:{meeting.minute}
              </div>
              <div className="flex-1 text-center py-2">{meeting.place}</div>
              <div className="flex-1 text-center py-2">
                {convertAppointmentMessage(meeting.status)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">진행된 만남이 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export default MenteeBarnabasMeetings;
