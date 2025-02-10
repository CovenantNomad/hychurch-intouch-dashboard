import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {useQuery} from "react-query";
import {getCellMeetingHistoricalYearly} from "../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {VIEW} from "../../../../../../../../interface/ui";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ViewTabs from "../../../../../../../Atoms/Tabs/ViewTabs";
import CellMeetingHistoricalYearlyChart from "./_components/CellMeetingHistoricalYearlyChart";
import CellMeetingHistoricalYearlyTable from "./_components/CellMeetingHistoricalYearlyTable";

type Props = {};

const CellMeetingHistoricalYearly = ({}: Props) => {
  const [views, setViews] = useState(VIEW.TABLE);

  const viewOptions = [
    {index: 0, label: "테이블", value: VIEW.TABLE},
    {index: 1, label: "차트", value: VIEW.CHART},
  ];

  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingHistoricalYearly"],
    () => getCellMeetingHistoricalYearly(),
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
            연간 데이터
          </h3>
        </div>
        <ViewTabs
          activeView={views}
          setActiveView={setViews}
          viewOptions={viewOptions}
        />
      </div>
      {isLoading ? (
        <div className="">
          <Skeleton className="w-full h-32" />
        </div>
      ) : data ? (
        <>
          {views === VIEW.TABLE && (
            <CellMeetingHistoricalYearlyTable data={data} />
          )}
          {views === VIEW.CHART && <CellMeetingHistoricalYearlyChart />}
        </>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            셀모임 관련 연간 통계 데이터를 조회하지 못했습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default CellMeetingHistoricalYearly;
