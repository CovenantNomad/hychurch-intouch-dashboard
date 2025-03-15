import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {BarChart} from "@tremor/react";
import {useQuery} from "react-query";
import {getCellMeetingMonthlyStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";

type CellMeetingMonthlyStaticProps = {};

const customTooltip = (props: any) => {
  const {payload, active, label} = props;
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border py-2 bg-tremor-background text-tremor-default shadow-tremor-dropdown">
      <div className="pb-2 border-b px-2">
        <p>{label}</p>
      </div>
      {payload.map((category: any, idx: number) => (
        <div key={idx} className="flex items-center px-2 pt-2 space-x-2.5">
          <div className={`w-2 h-2 bg-${category.color}-500 rounded`} />
          <p className="text-tremor-content">출석률</p>
          <p className="font-medium text-tremor-content-emphasis">
            {category.value} %
          </p>
        </div>
      ))}
    </div>
  );
};

const CellMeetingMonthlyStatic = ({}: CellMeetingMonthlyStaticProps) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingMonthlyStatics"],
    () => getCellMeetingMonthlyStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="border">
      <h3 className="font-semibold text-tremor-content px-4 py-3.5">
        월간 셀모임 출석률 통계
      </h3>
      {isLoading ? (
        <div className="px-4">
          <Skeleton className="w-full h-[318px]" />
        </div>
      ) : (
        <>
          {data ? (
            <div>
              <div className="flex justify-end mb-2 mr-2">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>출석률</span>
                  </div>
                </div>
              </div>
              <BarChart
                data={data}
                index="dateString"
                categories={["attendanceRate"]}
                colors={["blue"]}
                yAxisWidth={48}
                showLegend={false}
                customTooltip={customTooltip}
              />
            </div>
          ) : (
            <div className="h-[318px] flex flex-col justify-center items-center">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <span className="block text-sm text-gray-600 mt-1">
                월별 셀모임 통계를 조회하지 못했습니다.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CellMeetingMonthlyStatic;
