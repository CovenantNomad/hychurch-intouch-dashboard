import {BarChart} from "@tremor/react";
import {useQuery} from "react-query";
import {getCellMeetingMonthlyStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";

type CellMeetingMonthlyStaticProps = {};

const CellMeetingMonthlyStatic = ({}: CellMeetingMonthlyStaticProps) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingMonthlyStatics", "2024FIRST"],
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
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data ? (
            <BarChart
              data={data}
              index="month"
              categories={["attendanceRate"]}
              colors={["blue"]}
              // valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          ) : (
            <div>No Data</div>
          )}
        </>
      )}
    </div>
  );
};

export default CellMeetingMonthlyStatic;
