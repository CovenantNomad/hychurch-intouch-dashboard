import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {useQuery} from "react-query";
import {
  getCellMeetingHistoricalTerms,
  getTermSpecificInfomation,
} from "../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {VIEW} from "../../../../../../../../interface/ui";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ViewTabs from "../../../../../../../Atoms/Tabs/ViewTabs";
import CellMeetingHistoricalTermsChart from "./_components/CellMeetingHistoricalTermsChart";
import CellMeetingHistoricalTermsTable from "./_components/CellMeetingHistoricalTermsTable";

type Props = {};

const CellMeetingHistoricalTerms = ({}: Props) => {
  const [views, setViews] = useState(VIEW.TABLE);

  const viewOptions = [
    {index: 0, label: "테이블", value: VIEW.TABLE},
    {index: 1, label: "차트", value: VIEW.CHART},
  ];

  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingHistoricalTerms"],
    () => getCellMeetingHistoricalTerms(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {
    isLoading: isInfoLoading,
    isFetching: isInfoFetching,
    data: infoData,
  } = useQuery(
    ["getTermSpecificInfomation"],
    () => getTermSpecificInfomation(),
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
            반기 데이터
          </h3>
        </div>
        <ViewTabs
          activeView={views}
          setActiveView={setViews}
          viewOptions={viewOptions}
        />
      </div>
      {isLoading || isFetching || isInfoLoading || isInfoFetching ? (
        <div>
          <Skeleton className="w-full h-32" />
        </div>
      ) : data && infoData ? (
        <>
          {views === VIEW.TABLE && (
            <CellMeetingHistoricalTermsTable data={data} info={infoData} />
          )}
          {views === VIEW.CHART && (
            <CellMeetingHistoricalTermsChart data={data} />
          )}
        </>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            셀모임 관련 반기 통계 데이터를 조회하지 못했습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default CellMeetingHistoricalTerms;
