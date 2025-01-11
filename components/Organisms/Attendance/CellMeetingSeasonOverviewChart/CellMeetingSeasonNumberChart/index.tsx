import {AreaChart} from "@tremor/react";
import {TTermStaticResults} from "../../../../../firebase/CellMeeting/CellMeetingStatic";

type CellMeetingSeosonNumberChartProps = {
  data: TTermStaticResults[];
};

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

const CellMeetingSeasonNumberChart = ({
  data,
}: CellMeetingSeosonNumberChartProps) => {
  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>출석인원</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            <span>결석인원</span>
          </div>
        </div>
      </div>
      <AreaChart
        data={data}
        index="date"
        categories={["attendance", "absent"]}
        colors={["blue", "red"]}
        yAxisWidth={40}
        showXAxis
        intervalType={"preserveStartEnd"}
        className="mt-4 h-72 text-sm w-full"
        customTooltip={customTooltip}
        showLegend={false}
      />
    </>
  );
};

export default CellMeetingSeasonNumberChart;
