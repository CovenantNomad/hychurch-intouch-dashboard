import {ComboChart} from "../../../../../../../../../ui/ComboChart";

type Props = {
  data: {
    date: string;
    online?: number;
    offline?: number;
    total?: number;
  }[];
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
            }-500 rounded`}
          />
          <p className="text-tremor-content">
            {data.category === "offline"
              ? "성전예배자"
              : data.category === "online"
              ? "온라인예배자"
              : "전체인원"}
          </p>
          <p className="font-medium text-tremor-content-emphasis">
            {data.value} 명
          </p>
        </div>
      ))}
    </div>
  );
};

const IntouchServiceOnOffRatioChart = ({data}: Props) => {
  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>성전예배자</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
            <span>온라인예배자</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            <span>전체예배자</span>
          </div>
        </div>
      </div>
      <ComboChart
        data={data}
        index="date"
        enableBiaxial={true}
        barSeries={{
          categories: ["offline", "online"],
          yAxisLabel: "인터치예배 성전/온라인 예배자",
          colors: ["blue", "cyan"],
        }}
        lineSeries={{
          categories: ["total"],
          showYAxis: true,
          yAxisLabel: "전체참석인원(셀편성인원 기준)",
          colors: ["amber"],
        }}
        customTooltip={customTooltip}
        showLegend={false}
      />
    </div>
  );
};

export default IntouchServiceOnOffRatioChart;
