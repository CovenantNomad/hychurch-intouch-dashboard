import {BarChart} from "@tremor/react";
import {TSeoulBarChartData} from "../..";

type Props = {
  data: TSeoulBarChartData | undefined;
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
          <p className="text-tremor-content">등록자 수</p>
          <p className="font-medium text-tremor-content-emphasis">
            {category.value} 명
          </p>
        </div>
      ))}
    </div>
  );
};

const SeoulBarChart = ({data}: Props) => {
  return (
    <div className="px-2 mt-8">
      {data && (
        <BarChart
          data={data}
          index="name"
          categories={["count"]}
          colors={["blue"]}
          showLegend={false}
          showXAxis
          customTooltip={customTooltip}
        />
      )}
    </div>
  );
};

export default SeoulBarChart;
