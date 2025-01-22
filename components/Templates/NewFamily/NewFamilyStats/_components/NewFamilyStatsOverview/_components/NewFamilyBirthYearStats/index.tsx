import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getNewFamilyBirthYearStats} from "../../../../../../../../firebase/NewFamilyStats/newFamilyStats";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import NewFamilyBirthYearChart from "./_components/NewFamilyBirthYearChart";

export type TBirthYearChartData = {
  year: string;
  count: number;
}[];

const transformBirthYearDataForChart = (
  data: Record<string, any>
): TBirthYearChartData => {
  return Object.entries(data)
    .filter(([key]) => !["date", "month", "year"].includes(key)) // date, month, year 필드 제외
    .map(([year, count]) => ({
      year,
      count: Number(count || 0),
    }));
};

const NewFamilyBirthYearStats = () => {
  const [chartData, setChartData] = useState<TBirthYearChartData | null>(null);
  const {isLoading, isFetching, data} = useQuery(
    ["getNewFamilyBirthYearStats"],
    () => getNewFamilyBirthYearStats(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data) {
      const formattedData = transformBirthYearDataForChart(data);
      setChartData(formattedData);
    }
  }, [data]);

  return (
    <div>
      <div className="border rounded-md p-4">
        {isLoading || isFetching ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              새가족등록 출생년도 통계{" "}
              <span className="text-sm text-gray-600">
                (누적, 기준: 2025년)
              </span>
            </h3>
            <NewFamilyBirthYearChart data={chartData} />
          </>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              새가족등록자 출생년도 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFamilyBirthYearStats;
