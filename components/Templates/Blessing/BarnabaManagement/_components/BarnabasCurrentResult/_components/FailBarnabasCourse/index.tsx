import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {
  TMatching,
  TMatchingStatus,
} from "../../../../../../../../interface/barnabas";
import {convertMatchingMessage} from "../../../../../../../../utils/utils";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasRestartButton from "./_components/BarnabasRestartButton";

type Props = {
  isLoading: boolean;
  barnabasCourseList: TMatching[];
};

const FailBarnabasCourse = ({isLoading, barnabasCourseList}: Props) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">바나바과정 보류한 멘티명단</h4>
      {isLoading ? (
        <SkeletonTable />
      ) : barnabasCourseList.length !== 0 ? (
        <div className="w-full rounded-lg overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              매칭일
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              종료일
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              바나바
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              멘티
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              전체과정 진행상태
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              진행주차
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center">
              재시작
            </div>
          </div>

          {/* Body */}
          <div className="divide-y divide-gray-300">
            {barnabasCourseList.map((barnabas) => (
              <div
                key={barnabas.id}
                className="grid grid-cols-7 text-sm text-center items-center hover:bg-gray-50"
              >
                <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                  {barnabas.matchingDate}
                </div>
                <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                  {barnabas.completedDate}
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
                  {barnabas.completedMeetingCount}주차 /{" "}
                  {barnabas.scheduledMeetingCount}
                  주차
                </div>
                <div className="h-10 col-span-1 flex items-center justify-center">
                  <BarnabasRestartButton
                    matchingId={barnabas.id}
                    menteeId={barnabas.menteeId}
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
            바나바과정을 보류한 멘티가 없습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default FailBarnabasCourse;
