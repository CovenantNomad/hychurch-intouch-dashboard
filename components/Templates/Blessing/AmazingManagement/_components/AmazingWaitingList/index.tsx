import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useAmazingWaitingList} from "../../../../../../hooks/barnabas/useAmazingWaitingList";
import {TMatchingStatus} from "../../../../../../interface/barnabas";
import {convertMatchingMessage} from "../../../../../../utils/utils";
import SkeletonTable from "../../../../../Atoms/Skeleton/SkeletonTable";
import RegisterAmazingButton from "./_components/RegisterAmazingButton";

type Props = {};

const AmazingWaitingList = ({}: Props) => {
  const {isLoading, data} = useAmazingWaitingList();

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">어메이징 과정 대기자</h4>

      {isLoading ? (
        <SkeletonTable />
      ) : data && data.length !== 0 ? (
        <div className="w-full rounded-lg overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-gray-300 text-sm text-center text-[#71717A]">
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              매칭일
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              종료일
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              바나바
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              멘티
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              진행주차
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              바나바과정 수료상태
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center">
              어메이징 등록
            </div>
          </div>

          {/* Body */}
          <div className="divide-y divide-gray-300">
            {data
              .slice()
              .sort((a, b) => {
                const dateA = a.completedDate
                  ? new Date(a.completedDate).getTime()
                  : Infinity;
                const dateB = b.completedDate
                  ? new Date(b.completedDate).getTime()
                  : Infinity;
                return dateA - dateB; // 오래된 날짜가 먼저 오도록 정렬
              })
              .map((mentee) => (
                <div
                  key={mentee.menteeId}
                  className="grid grid-cols-7 text-sm text-center items-center hover:bg-gray-50"
                >
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    {mentee.matchingDate}
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    {mentee.completedDate}
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    {mentee.barnabaName}
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    {mentee.menteeName}
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    {mentee.completedMeetingCount}주차 /{" "}
                    {mentee.scheduledMeetingCount}주차
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                    <span
                      className={`text-white px-2 py-1 rounded-full ${
                        mentee.barnabasStatus === TMatchingStatus.COMPLETED
                          ? "bg-blue-500"
                          : mentee.barnabasStatus === TMatchingStatus.PROGRESS
                          ? "bg-teal-500"
                          : mentee.barnabasStatus === TMatchingStatus.PENDING
                          ? "bg-gray-600"
                          : "bg-amber-500"
                      }`}
                    >
                      {convertMatchingMessage(mentee.barnabasStatus)}
                    </span>
                  </div>
                  <div className="h-12 col-span-1 flex items-center justify-center">
                    <RegisterAmazingButton
                      menteeId={mentee.menteeId}
                      menteeName={mentee.menteeName}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            바나바과정을 완료한 멘티가 없습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default AmazingWaitingList;
