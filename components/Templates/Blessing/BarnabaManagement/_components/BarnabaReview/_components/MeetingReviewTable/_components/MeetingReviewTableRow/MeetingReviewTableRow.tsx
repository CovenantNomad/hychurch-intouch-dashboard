import {useState} from "react";
import {TAppointment} from "../../../../../../../../../../interface/barnabas";
import {classNames} from "../../../../../../../../../../utils/utils";

type Props = {
  sortedGroupedAppointments: TAppointment[][];
};

const MeetingReviewTableRow = ({sortedGroupedAppointments}: Props) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (matchingId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [matchingId]: !prev[matchingId],
    }));
  };

  return (
    <>
      {sortedGroupedAppointments.map((group) => {
        const latestReview = group.reduce((prev, current) =>
          Number(current.week) > Number(prev.week) ? current : prev
        );

        return (
          <div
            key={latestReview.matchingId}
            className="border-b border-gray-200"
          >
            {/* ✅ 최신 후기를 기본 표시 */}
            <div className="grid grid-cols-12 items-center py-2 text-sm">
              <div className="col-span-1 flex justify-center">
                {latestReview.date}
              </div>
              <div className="col-span-1 flex justify-center leading-[1.6]">
                멘티: {latestReview.menteeName}
                <br />
                바나바: {latestReview.barnabaName}
              </div>
              <div className="col-span-8 whitespace-pre-wrap leading-[1.6] px-4">
                {latestReview.review}
              </div>
              <div className="col-span-1 flex flex-col items-center text-center">
                {latestReview.week}주차 <br />(
                {latestReview.scheduledMeetingCount}주 과정)
              </div>
              <div className="col-span-1 flex flex-col items-center text-center">
                {group.length > 1 && (
                  <button
                    onClick={() => toggleExpand(latestReview.matchingId)}
                    className="mt-1 text-blue-500 text-xs underline"
                  >
                    {expandedGroups[latestReview.matchingId]
                      ? "숨기기"
                      : "더 보기"}
                  </button>
                )}
              </div>
            </div>

            {/* ✅ 이전 후기를 "더 보기" 클릭 시 표시 */}
            {expandedGroups[latestReview.matchingId] && (
              <div className="bg-gray-50">
                {group
                  .filter(
                    (appointment) => appointment.week !== latestReview.week
                  )
                  .sort((a, b) => Number(b.week) - Number(a.week)) // 최신순 정렬
                  .map((appointment, index, array) => (
                    <div
                      key={appointment.appointmentId}
                      className={classNames(
                        "grid grid-cols-12 items-center py-2 text-sm border-gray-200",
                        index === 0 ? "border-t" : "",
                        index !== array.length - 1 ? "border-b" : ""
                      )}
                    >
                      <div className="col-span-1 flex justify-center">
                        {appointment.date}
                      </div>
                      <div className="col-span-1 flex justify-center leading-[1.6]">
                        멘티: {appointment.menteeName}
                        <br />
                        바나바: {appointment.barnabaName}
                      </div>
                      <div className="col-span-8 whitespace-pre-wrap leading-[1.6] px-4">
                        {appointment.review}
                      </div>
                      <div className="col-span-1 flex justify-center text-center">
                        {appointment.week}주차
                      </div>
                      <div className="col-span-1 flex justify-center text-center" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MeetingReviewTableRow;
