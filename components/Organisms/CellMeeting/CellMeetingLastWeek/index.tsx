import {useQuery} from "react-query";
import {getCellMeetingRecentStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";

type Props = {};

const CellMeetingLastWeek = ({}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingRecentStatics"],
    () => getCellMeetingRecentStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        가장 최근 셀모임 데이터{" "}
        <span className="text-sm">
          ({data ? data.recentDate : "데이터 조회 실패"})
        </span>
      </h3>
      <div className="grid grid-cols-4 gap-x-8 mt-2">
        <div className="border rounded-md p-4 col-span-1">
          <dt className="tracking-tight text-sm font-normal pb-2">
            셀편성인원
          </dt>
          {isLoading ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data ? data.recentTotal + "명" : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${data.recentTotal - data.previousTotal >= 0 ? "+" : ""}` +
                    `${data.recentTotal - data.previousTotal}` +
                    "명" +
                    ` (from ${data.previousDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="tracking-tight text-sm font-normal pb-2">
            출석/결석 인원
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
            </>
          ) : (
            <dd className="text-2xl font-bold text-gray-900">
              {data
                ? `${data.recentAttendance}` +
                  "명 / " +
                  `${data.recentAbsent}명`
                : "데이터 조회 실패"}
            </dd>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="tracking-tight text-sm font-normal pb-2">출석률</dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-2/5 h-[32px]" />
              <Skeleton className="w-4/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data ? data.recentAttendanceRate + "%" : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${
                      Number(data.recentAttendanceRate) -
                        Number(data.previousAttendanceRate) >=
                      0
                        ? "+"
                        : ""
                    }` +
                    `${(
                      Number(data.recentAttendanceRate) -
                      Number(data.previousAttendanceRate)
                    ).toFixed(2)}` +
                    "%" +
                    ` (from ${data.previousDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
        <div className="border rounded-md p-4 col-span-1">
          <dt className="tracking-tight text-sm font-normal pb-2">
            셀편성인원 변화
          </dt>
          {isLoading || isFetching ? (
            <>
              <Skeleton className="w-4/5 h-[32px]" />
              <Skeleton className="w-3/5 h-[14px] mt-1" />
            </>
          ) : (
            <>
              <dd className="text-2xl font-bold text-gray-900">
                {data
                  ? `${data.firstWeekTotal}명` + " → " + `${data.recentTotal}명`
                  : "데이터 조회 실패"}
              </dd>
              <dd className="text-xs text-gray-500">
                {data
                  ? `${
                      data.recentTotal - data.firstWeekTotal >= 0 ? "+" : "-"
                    }` +
                    `${data.recentTotal - data.firstWeekTotal}` +
                    "명" +
                    ` (from ${data.firstWeekDate})`
                  : "데이터 조회 실패"}
              </dd>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CellMeetingLastWeek;
