import {useQuery} from "react-query";
import {
  getMostHighServiceTotalCount,
  getServiceRecentStatics,
} from "../../../../../../../../firebase/Services/serviceStatic";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";

type Props = {};

const StatCardTooltip = ({text}: {text: string}) => {
  return (
    <div className="group relative ml-2 cursor-pointer">
      <span className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded-full border border-gray-400">
        ?
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-black text-white text-xs rounded-md py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {text}
      </div>
    </div>
  );
};

const IntouchServiceLastWeek = ({}: Props) => {
  const {isLoading, data} = useQuery(
    ["getServiceRecentStatics"],
    () => getServiceRecentStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {isLoading: isTotalCountLoading, data: totalCount} = useQuery(
    ["getMostHighServiceTotalCount"],
    () => getMostHighServiceTotalCount(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        가장 최근 인터치 예배{" "}
        <span className="text-sm">
          ({data ? data.recentDate : "데이터 조회 실패"})
        </span>
      </h3>
      <div className="grid grid-cols-4 gap-x-8 mt-2">
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            인터치예배 참석인원 (성전계수)
          </dt>
          {isLoading ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data ? data.recentCountTotal + "명" : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${
                      data.recentCountTotal - data.previousCountTotal >= 0
                        ? "+"
                        : ""
                    }` +
                    `${data.recentCountTotal - data.previousCountTotal}` +
                    "명" +
                    ` (from ${data.previousDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            셀편성/미편성 예배자 (기준: 성전계수)
          </dt>
          {isLoading ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data
                  ? `${data.recentCell}` + "명 / " + `${data.recentNonCell}명`
                  : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${data.recentCell - data.previousCell >= 0 ? "+" : ""}` +
                    `${data.recentCell - data.previousCell}` +
                    "명 / " +
                    `${
                      data.recentNonCell - data.previousNonCell >= 0 ? "+" : ""
                    }` +
                    `${data.recentNonCell - data.previousNonCell}` +
                    "명" +
                    ` (from ${data.previousDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            성전/온라인 예배자 (기준: 셀편성인원)
          </dt>
          {isLoading ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-4/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data
                  ? `${data.recentOffline}` + "명 / " + `${data.recentOnline}명`
                  : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${
                      data.recentOffline - data.previousOffline >= 0 ? "+" : ""
                    }` +
                    `${data.recentOffline - data.previousOffline}` +
                    "명 / " +
                    `${
                      data.recentOnline - data.previousOnline >= 0 ? "+" : ""
                    }` +
                    `${data.recentOnline - data.previousOnline}` +
                    "명" +
                    ` (from ${data.previousDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="flex items-center tracking-tight text-sm font-normal pb-2">
            최대 인터치예배 참석인원 (기준: 성전계수)
          </dt>
          {isTotalCountLoading ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {totalCount ? totalCount.count + "명" : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {totalCount ? ` (at ${totalCount.date})` : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default IntouchServiceLastWeek;
