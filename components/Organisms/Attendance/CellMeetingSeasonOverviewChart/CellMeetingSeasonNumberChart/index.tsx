import {AreaChart, EventProps} from "@tremor/react";
import {useState} from "react";
import {useQuery} from "react-query";
import {term, termDisplay} from "../../../../../constants/constant";
import {getCellMeetingSeasonNumberStatics} from "../../../../../firebase/CellMeeting/CellMeetingStatic";

type CellMeetingSeosonNumberChartProps = {};

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
          <p className="text-tremor-content">
            {category.dataKey === "attendance" ? "출석" : "미참석"}
          </p>
          <p className="font-medium text-tremor-content-emphasis">
            {category.value} 명
          </p>
        </div>
      ))}
    </div>
  );
};

const CellMeetingSeasonNumberChart =
  ({}: CellMeetingSeosonNumberChartProps) => {
    const [value, setValue] = useState<EventProps>(null);

    const {isLoading, isFetching, data} = useQuery(
      ["getCellMeetingSeasonNumberStatics", term],
      () => getCellMeetingSeasonNumberStatics(term),
      {
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
      }
    );

    return (
      <>
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {termDisplay} 셀모임 참석/미참석 인원 통계
        </h3>
        {isLoading || isFetching ? (
          <div>로딩중...</div>
        ) : (
          <>
            {data && (
              <AreaChart
                data={data}
                index="date"
                categories={["attendance", "absent"]}
                colors={["blue", "red"]}
                yAxisWidth={40}
                showXAxis
                onValueChange={(v) => setValue(v)}
                intervalType={"preserveStartEnd"}
                className="mt-4 h-72 text-sm w-full"
                customTooltip={customTooltip}
              />
            )}
          </>
        )}
      </>
    );
  };

export default CellMeetingSeasonNumberChart;
