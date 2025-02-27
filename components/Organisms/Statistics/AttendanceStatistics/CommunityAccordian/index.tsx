import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {CellLeaderAttendanceSubmissionStatus} from "../../../../../graphql/generated";
import {AttendanceSubmissionType} from "../../../../../interface/attendance";
import CellNameChip from "../../../../Blocks/CellNameChip";

interface CommunityAccordianProps {
  isLoading: boolean;
  communityName: string;
  checkSubmission: AttendanceSubmissionType[] | undefined;
  onSelectHandler: (id: string, name: string) => void;
}

const CommunityAccordian = ({
  isLoading,
  communityName,
  checkSubmission,
  onSelectHandler,
}: CommunityAccordianProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-blue-100 px-4 py-3 lg:flex-row lg:py-4">
      <div className="flex items-center pl-2 pr-6 py-1 lg:pr-10">
        <div className="w-10">
          <span className="font-semibold">{communityName}</span>
        </div>
        <div className="flex items-center p-1 lg:hidden lg:p-0">
          {isOpen ? (
            <button onClick={() => setIsOpen(false)}>
              <MinusIcon className="w-4 h-4 text-gray-500 font-light" />
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <PlusIcon className="w-4 h-4 text-gray-500 font-light" />
            </button>
          )}
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } mt-2 lg:flex lg:items-center lg:mt-0`}
      >
        {isLoading ? (
          <div className="animate-pulse flex space-x-6">
            {Array.from({length: 8}).map((_, index) => (
              <div
                key={index}
                className="h-8 w-16 bg-slate-600/10 rounded-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="">
            {checkSubmission ? (
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {checkSubmission.map((cell) => {
                  const checkedCell = checkSubmission.find(
                    (item) => item.cellId === cell.cellId
                  );

                  return (
                    <CellNameChip
                      key={cell.cellId}
                      cellId={cell.cellId}
                      cellName={cell.cellName}
                      submissionStatus={
                        checkedCell?.submissionStatus ===
                        CellLeaderAttendanceSubmissionStatus.Complete
                      }
                      onSelectHandler={onSelectHandler}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="text-sm">데이터를 불러오지 못했습니다 🙅🏻</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityAccordian;
