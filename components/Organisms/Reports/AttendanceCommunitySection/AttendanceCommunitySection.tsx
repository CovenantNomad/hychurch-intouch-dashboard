import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {CellLeaderAttendanceSubmissionStatus} from "../../../../graphql/generated";
import {AttendanceSubmissionType} from "../../../../interface/attendance";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";

interface AttendanceCommunitySectionProps {
  communityName: string;
  communityCells: AttendanceSubmissionType[] | undefined;
}

const AttendanceCommunitySection = ({
  communityName,
  communityCells,
}: AttendanceCommunitySectionProps) => {
  const submittedCount =
    communityCells?.filter(
      (cell) =>
        cell.submissionStatus === CellLeaderAttendanceSubmissionStatus.Complete,
    ).length ?? 0;

  const notSubmittedCount =
    communityCells?.filter(
      (cell) =>
        cell.submissionStatus !== CellLeaderAttendanceSubmissionStatus.Complete,
    ).length ?? 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {communityCells && communityCells.length > 0 ? (
        <>
          {/* 🔥 상단: 이름 + 요약 한줄 */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-semibold text-gray-900">
              {communityName}
            </p>

            {notSubmittedCount === 0 ? (
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                전체 제출 완료
              </span>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-teal-700">
                  제출 {submittedCount}
                </span>
                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700">
                  미제출 {notSubmittedCount}
                </span>
              </div>
            )}
          </div>

          {/* 🔥 셀 리스트 (가로 flow) */}
          <div className="flex flex-wrap gap-3">
            {communityCells.map((cell) => {
              const isSubmitted =
                cell.submissionStatus ===
                CellLeaderAttendanceSubmissionStatus.Complete;

              return (
                <div
                  key={String(cell.cellId)}
                  className={`
                    ${
                      isSubmitted
                        ? "bg-teal-50 border-teal-200"
                        : "bg-rose-50 border-rose-200"
                    }
                    min-w-[120px] flex justify-between items-center gap-2 rounded-md border px-3 py-2 text-sm
                  `}
                >
                  <span className="text-gray-800">{cell.cellName}</span>

                  {isSubmitted ? (
                    <CheckIcon className="h-4 w-4 text-teal-700" />
                  ) : (
                    <XMarkIcon className="h-4 w-4 text-rose-700" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="py-4">
          <EmptyStateSimple />
        </div>
      )}
    </div>
  );
};

export default AttendanceCommunitySection;
