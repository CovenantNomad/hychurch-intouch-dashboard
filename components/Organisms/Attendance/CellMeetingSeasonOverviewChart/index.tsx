import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useQuery} from "react-query";
import {getCellMeetingTermStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";
import {convertTerm} from "../../../../utils/utils";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";
import CellMeetingSeasonAverageChart from "./CellMeetingSeasonAverageChart";
import CellMeetingSeasonNumberChart from "./CellMeetingSeasonNumberChart";

type CellMeetingOverviewChartProps = {};

const CellMeetingSeasonOverviewChart = ({}: CellMeetingOverviewChartProps) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingSeasonNumberStatics"],
    () => getCellMeetingTermStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="3xl:grid 3xl:grid-cols-2 3xl:gap-x-8">
      <div className="border rounded-md p-4 3xl:col-span-1">
        {isLoading || isFetching ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {convertTerm(data.term)} 셀모임 참석/미참석 인원 통계
            </h3>
            <CellMeetingSeasonNumberChart data={data.termStatticResuls} />
          </>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              올해 셀모임 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
      <div className="border rounded-md p-4 mt-4 3xl:col-span-1 3xl:mt-0">
        {isLoading || isFetching ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {convertTerm(data.term)} 셀모임 출석률 통계
            </h3>
            <CellMeetingSeasonAverageChart data={data.attendanceRateResults} />
          </>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              올해 셀모임 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CellMeetingSeasonOverviewChart;
