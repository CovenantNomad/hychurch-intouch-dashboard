import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import {useState} from "react";
import {useQuery} from "react-query";
import {getBarnabasYearlyRecords} from "../../../../../../firebase/Barnabas/barnabas";
import SkeletonTable from "../../../../../Atoms/Skeleton/SkeletonTable";
import BarnabasHistoryTable from "../BarnabasHistory/_components/BarnabasHistoryTable";

type Props = {};

const BarnabasYearlyHistory = ({}: Props) => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getBarnabasYearlyRecords", selectedYear],
    () => getBarnabasYearlyRecords(selectedYear),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // 이전 연도로 이동
  const handlePrevYear = () => {
    if (selectedYear > 2023) {
      setSelectedYear((prev) => prev - 1);
    }
  };

  // 다음 연도로 이동
  const handleNextYear = () => {
    if (selectedYear < dayjs().year()) {
      setSelectedYear((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <div className="flex justify-between items-center py-3 mb-4">
          <h6 className="text-lg font-medium">바나바양육 연간기록</h6>
          <button
            onClick={() => refetch()}
            className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
        <div className="flex items-center justify-center mb-3">
          <button
            onClick={handlePrevYear}
            className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded-md"
            disabled={selectedYear <= 2023}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div className="text-base font-medium mx-14">{selectedYear}</div>
          <button
            onClick={handleNextYear}
            className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded-md"
            disabled={selectedYear >= dayjs().year()}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div>
          {isLoading || isFetching ? (
            <SkeletonTable />
          ) : data && data.length !== 0 ? (
            <BarnabasHistoryTable data={data} />
          ) : (
            <div className="h-32 flex flex-col justify-center items-center space-y-1">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <span className="text-sm text-gray-500">
                바나바 양육 이력이 없습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BarnabasYearlyHistory;
