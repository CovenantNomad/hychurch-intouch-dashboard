import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getNewFamilyRecentStats} from "../../../../../../../../firebase/NewFamilyStats/newFamilyStats";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";

type Props = {};

const transformToChartData = (data: any) => {
  // 필요한 데이터를 배열 형태로 반환
  return [
    {
      date: data.recentDate,
      group1: Number(data.recentGroup1 || 0),
      group2: Number(data.recentGroup2 || 0),
      group3: Number(data.recentGroup3 || 0),
      group4: Number(data.recentGroup4 || 0),
      group5: Number(data.recentGroup5 || 0),
    },
  ];
};

const NewFamilyLastWeekStats = ({}: Props) => {
  const [chartData, setChartData] = useState<
    {
      date: string;
      group1: number;
      group2: number;
      group3: number;
      group4: number;
      group5: number;
    }[]
  >([]);
  const {isLoading, isFetching, data} = useQuery(
    ["getNewFamilyRecentStats"],
    () => getNewFamilyRecentStats(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data) {
      const transformedData = transformToChartData(data);
      setChartData(transformedData);
    }
  }, [data]);

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        가장 최근 새가족등록 정보{" "}
        <span className="text-sm">
          ({data ? data.recentDate : "데이터 조회 실패"})
        </span>
      </h3>
      <div className="grid grid-cols-4 gap-x-8 mt-2">
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            이번주 새가족 등록자 수
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data ? data.recentTotal + "명" : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            성별비율 (형제/자매)
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data
                  ? `${data.recentCounMale}` +
                    "명 / " +
                    `${data.recentFemale}명`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            연령대별
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-4/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-[20px] leading-[32px] font-bold text-gray-900">
                {data
                  ? `${data.recentGroup1}` +
                    "명 / " +
                    `${data.recentGroup2}` +
                    "명 / " +
                    `${data.recentGroup3}` +
                    "명 / " +
                    `${data.recentGroup4}` +
                    "명 / " +
                    `${data.recentGroup5}명`
                  : "데이터 조회 실패"}
              </dd>
              {/* <SparkBarChart
                data={chartData}
                index="date"
                categories={["group1", "group2", "group3", "group4", "group5"]}
              /> */}
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            올해 누적등록 (총원, 형제/자매)
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data ? (
                  <>
                    {data.accumulateRegistration}명{" "}
                    <span className="text-base">
                      ({data.accumulateMale}명 / {data.accumulateFemale}명)
                    </span>
                  </>
                ) : (
                  "데이터 조회 실패"
                )}
              </dd>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewFamilyLastWeekStats;
