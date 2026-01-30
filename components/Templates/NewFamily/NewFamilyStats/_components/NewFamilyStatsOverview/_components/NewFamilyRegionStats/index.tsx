import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {ArrowPathIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getNewFamilyRegionStats} from "../../../../../../../../firebase/NewFamilyStats/newFamilyStats";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import NewFamilyRegionChart from "./_components/NewFamilyRegionChart";
import SeoulBarChart from "./_components/SeoulBarChart";

type Props = {};

export type TSeoulBarChartData = {
  name: string; // 구 이름
  count: number; // 등록 수
}[];

const transformSeoulDetailsToBarChartData = (
  seoulDetails: Record<string, number>,
): TSeoulBarChartData => {
  return Object.entries(seoulDetails)
    .filter(([_, count]) => count > 0) // 0 값 제외
    .map(([name, count]) => ({
      name,
      count,
    }));
};

const NewFamilyRegionStats = ({}: Props) => {
  const [regionRatio, setRegionRatio] = useState<
    {name: string; amout: number}[]
  >([
    {name: "서울", amout: 0},
    {name: "경기", amout: 0},
    {name: "지방", amout: 0},
  ]);
  const [seoulDistrict, setSeoulDistrict] = useState<TSeoulBarChartData>();

  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getNewFamilyRegionStats"],
    () => getNewFamilyRegionStats(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );

  useEffect(() => {
    if (data) {
      setRegionRatio([
        {name: "서울", amout: data.seoulSum},
        {name: "경기", amout: data.gyeonggiSum},
        {name: "지방", amout: data.local},
      ]);
      const chartData = transformSeoulDetailsToBarChartData(data.seoulDetails);
      setSeoulDistrict(chartData);
    }
  }, [data]);

  console.log(data);

  return (
    <div>
      <div className="border rounded-md p-4">
        {isLoading ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <div className="grid grid-cols-3 space-x-8">
            <div className="col-span-1">
              <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                새가족 지역별 통계{" "}
                <span className="text-sm text-gray-600">
                  {`(누적, 기준: ${data.date}년)`}
                </span>
              </h3>
              <NewFamilyRegionChart data={regionRatio} />
            </div>

            <div className="col-span-2">
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  새가족 서울시 구별 통계{" "}
                  <span className="text-sm text-gray-600">
                    {`(누적, 기준: ${data.date}년)`}
                  </span>
                </h3>
                <div className="flex justify-end items-center mb-1">
                  {isFetching && (
                    <span className="animate-pulse text-xs mr-4">
                      새로고침 중..
                    </span>
                  )}
                  <button
                    onClick={() => refetch()}
                    className="flex items-center text-xs hover:bg-gray-100 py-2 px-3 rounded-md"
                  >
                    새로고침 <ArrowPathIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
              <SeoulBarChart data={seoulDistrict} />
            </div>
          </div>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              새가족등록 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFamilyRegionStats;
