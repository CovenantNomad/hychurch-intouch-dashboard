import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {useQuery} from "react-query";
import {getCellMeetingHistoricalMonthly} from "../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {VIEW} from "../../../../../../../../interface/ui";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ViewTabs from "../../../../../../../Atoms/Tabs/ViewTabs";
import CellMeetingHistoricalMonthlyChart from "./_components/CellMeetingHistoricalMonthlyChart";
import CellMeetingHistoricalMonthlyTable from "./_components/CellMeetingHistoricalMonthlyTable";

type Props = {};

const CellMeetingHistoricalMonthly = ({}: Props) => {
  const [views, setViews] = useState(VIEW.TABLE);

  const viewOptions = [
    {index: 0, label: "테이블", value: VIEW.TABLE},
    {index: 1, label: "차트", value: VIEW.CHART},
  ];

  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingHistoricalMonthly"],
    () => getCellMeetingHistoricalMonthly(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            월간 데이터
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
            <CellMeetingHistoricalMonthlyTable data={data} />
          )}
          {views === VIEW.CHART && (
            <CellMeetingHistoricalMonthlyChart data={data} />
          )}
        </>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            셀모임 관련 월간 통계 데이터를 조회하지 못했습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default CellMeetingHistoricalMonthly;
