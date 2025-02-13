import dayjs from "dayjs";
import {ChevronLeft, ChevronRight, MessageSquareXIcon} from "lucide-react";
import {useState} from "react";
import {useQuery} from "react-query";
import {getBarnabasYearlyRecordsById} from "../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../interface/barnabas";
import {convertMatchingMessage, cx} from "../../../../../../../../utils/utils";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";

type Props = {
  id: string;
};

const BarnabasYearlyRecord = ({id}: Props) => {
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const {isLoading, data} = useQuery(
    ["getBarnabasYearlyRecords", id, currentYear],
    () => getBarnabasYearlyRecordsById(id, currentYear),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: !!id,
    }
  );

  // 이전 연도로 이동
  const handlePrevYear = () => {
    if (currentYear > 2023) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  // 다음 연도로 이동
  const handleNextYear = () => {
    if (currentYear < dayjs().year()) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  return (
    <div className="w-2/3 p-4 border border-gray-200 rounded-md">
      <h3 className="border-b pb-1 mb-4 text-lg font-semibold">
        연도별 히스토리{" "}
        <span className="text-sm font-normal">(기준: 바나바과정 완료일)</span>
      </h3>
      <div>
        <div className="flex items-center justify-center my-8">
          <button
            onClick={handlePrevYear}
            className="p-0 w-10 h-10"
            disabled={currentYear <= 2023}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-base font-medium mx-8">{currentYear}</div>
          <button
            onClick={handleNextYear}
            className="p-0 w-10 h-10"
            disabled={currentYear >= dayjs().year()}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="border-y divide-y">
          {isLoading ? (
            <Skeleton className="h-[56px] my-4" />
          ) : data && data.length !== 0 ? (
            data
              .slice()
              .sort((a, b) => a.completedDate!.localeCompare(b.completedDate!))
              .map((record) => (
                <div key={record.matchingId} className="flex items-center py-4">
                  <div className="flex-1 flex flex-col space-y-1">
                    <div>
                      <span className="text-xl font-normal mr-2">
                        {record.menteeName}
                      </span>
                      <span className="text-sm">멘티</span>
                    </div>
                    <div>
                      <span className="text-sm mr-2">
                        ({record.scheduledMeetingCount}주과정)
                      </span>
                      <span className="text-sm">
                        {record.matchingDate} ~ {record.completedDate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={cx(
                        "w-[50px] h-[50px] flex justify-center items-center rounded-full text-white text-xs",
                        record.status === TMatchingStatus.COMPLETED &&
                          "bg-blue-500",
                        record.status === TMatchingStatus.FAILED &&
                          "bg-amber-500"
                      )}
                    >
                      {convertMatchingMessage(record.status)}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div className="h-[200px] flex flex-col justify-center items-center border-x">
              <MessageSquareXIcon className="h-6 w-6" />
              <span className="text-sm mt-2">히스토리 없음</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarnabasYearlyRecord;
