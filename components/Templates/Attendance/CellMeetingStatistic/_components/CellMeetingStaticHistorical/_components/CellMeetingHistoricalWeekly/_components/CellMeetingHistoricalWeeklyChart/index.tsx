import {TCellMeetingWeeklyStatic} from "../../../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {ComboChart} from "../../../../../../../../../ui/ComboChart";

type Props = {
  data: TCellMeetingWeeklyStatic[];
};

const customTooltip = (props: any) => {
  const {payload, active, label} = props;

  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border py-2 bg-tremor-background text-tremor-default shadow-tremor-dropdown">
      <div className="pb-2 border-b px-2">
        <p>{label}</p>
      </div>
      {payload.map((data: any, idx: number) => (
        <div key={idx} className="flex items-center px-2 pt-2 space-x-2.5">
          <div
            className={`w-2 h-2 bg-${
              data.chartType === "bar" ? data.barColor : data.lineColor
            }-500 ${data.chartType === "bar" ? "" : "rounded"}`}
          />
          <p className="text-tremor-content">
            {data.category === "attendance"
              ? "출석"
              : data.category === "absent"
              ? "미출석"
              : "출석률"}
          </p>
          <p className="font-medium text-tremor-content-emphasis">
            {data.value} {data.category === "attendanceRate" ? "%" : "명"}
          </p>
        </div>
      ))}
    </div>
  );
};

const CellMeetingHistoricalWeeklyChart = ({data}: Props) => {
  return (
    <div className="mt-8">
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>참석인원</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            <span>미참석인원</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span>출석률</span>
          </div>
        </div>
      </div>
      <ComboChart
        data={data}
        index="dateString"
        enableBiaxial={true}
        barSeries={{
          categories: ["attendance", "absent"],
          yAxisLabel: "참석/미참석 인원 (명) (Bars)",
          colors: ["blue", "pink"],
        }}
        lineSeries={{
          categories: ["attendanceRate"],
          showYAxis: true,
          yAxisLabel: "출석률(%) (Line)",
          colors: ["amber"],
        }}
        customTooltip={customTooltip}
        showLegend={false}
      />
    </div>
  );
};

export default CellMeetingHistoricalWeeklyChart;
