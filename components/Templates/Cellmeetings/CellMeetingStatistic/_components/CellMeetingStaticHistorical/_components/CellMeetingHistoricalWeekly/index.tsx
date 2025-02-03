import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {useCellMeetingInfiniteQuery} from "../../../../../../../../hooks/useCellMeetingInfiniteQuery";
import {VIEW} from "../../../../../../../../interface/ui";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ViewTabs from "../../../../../../../Atoms/Tabs/ViewTabs";
import CellMeetingHistoricalWeeklyChart from "./_components/CellMeetingHistoricalWeeklyChart";
import CellMeetingHistoricalWeeklyTable from "./_components/CellMeetingHistoricalWeeklyTable";

type Props = {};

const CellMeetingHistoricalWeekly = ({}: Props) => {
  const [views, setViews] = useState(VIEW.TABLE);

  const viewOptions = [
    {index: 0, label: "테이블", value: VIEW.TABLE},
    {index: 1, label: "차트", value: VIEW.CHART},
  ];

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useCellMeetingInfiniteQuery();

  // 모든 페이지 데이터를 하나의 배열로 합침
  const cellMeetingData = data?.pages.flatMap((page) => page?.data || []) || [];

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            주간 데이터
          </h3>
        </div>
        <ViewTabs
          activeView={views}
          setActiveView={setViews}
          viewOptions={viewOptions}
        />
      </div>
      {isLoading ? (
        <div>
          <Skeleton className="w-full h-32" />
        </div>
      ) : data ? (
        <>
          {views === VIEW.TABLE && (
            <CellMeetingHistoricalWeeklyTable data={cellMeetingData} />
          )}
          {views === VIEW.CHART && (
            <CellMeetingHistoricalWeeklyChart data={cellMeetingData} />
          )}

          <div className="flex justify-center items-center mt-8 pb-2">
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-black text-white py-2 px-4 rounded-md shadow"
              >
                {isFetchingNextPage ? "불러오는 중..." : "더보기"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            셀모임 관련 주간 통계 데이터를 조회하지 못했습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default CellMeetingHistoricalWeekly;
