import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {TMatching} from "../../../../../../../../interface/barnabas";
import {getProgressDuration} from "../../../../../../../../utils/utils";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasRestartButton from "./_components/BarnabasRestartButton";

type Props = {
  isLoading: boolean;
  barnabasCourseList: TMatching[];
};

const FailBarnabasCourse = ({isLoading, barnabasCourseList}: Props) => {
  return (
    <div>
      <h4 className="text-lg font-semibold">
        바나바과정 <span className="text-amber-500">보류한</span> 멘티명단
      </h4>
      <p className="text-sm text-gray-500 mb-4">
        현재 블레싱에 편성된 청년 중 바나바과정이 보류된 명단입니다.
      </p>
      {isLoading ? (
        <SkeletonTable />
      ) : barnabasCourseList.length !== 0 ? (
        <>
          <p className="text-right text-sm text-gray-500 mb-1">
            새로시작: 진행했던 주차를 리셋하고 0주차부터 시작합니다. |
            이어서시작: 진행했던 주차를 보존하고 이어서 진행합니다.
          </p>
          <div className="w-full rounded-lg overflow-hidden border border-gray-300">
            {/* Header */}
            <div className="grid grid-cols-10 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                매칭일
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                종료일
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                멘티
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                바나바
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                진행기간
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                진행주차
              </div>
              <div className="h-10 col-span-3 flex items-center justify-center border-r border-gray-300">
                비고
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center">
                재시작
              </div>
            </div>

            {/* Body */}
            <div className="divide-y divide-gray-300">
              {barnabasCourseList
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
                .map((barnabas) => (
                  <div
                    key={barnabas.id}
                    className="grid grid-cols-10 text-sm text-center items-center hover:bg-gray-50"
                  >
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {barnabas.matchingDate}
                    </div>
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {barnabas.completedDate}
                    </div>
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {barnabas.menteeName}
                    </div>
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {barnabas.barnabaName}
                    </div>
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {getProgressDuration({
                        matchingDate: barnabas.matchingDate,
                        completedDate: barnabas.completedDate,
                        lastMeetingDate: barnabas.lastMeetingDate,
                        completedMeetingCount: barnabas.completedMeetingCount,
                        scheduledMeetingCount: barnabas.scheduledMeetingCount,
                      })}
                      주 주
                    </div>
                    <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
                      {barnabas.completedMeetingCount}주차 /{" "}
                      {barnabas.scheduledMeetingCount}
                      주차
                    </div>
                    <div className="h-12 col-span-3 flex items-center justify-center border-r border-gray-300">
                      {barnabas.description}
                    </div>
                    <div className="h-10 col-span-1 flex items-center justify-center">
                      <BarnabasRestartButton
                        matchingId={barnabas.id}
                        barnabaId={barnabas.barnabaId}
                        menteeId={barnabas.menteeId}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
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
