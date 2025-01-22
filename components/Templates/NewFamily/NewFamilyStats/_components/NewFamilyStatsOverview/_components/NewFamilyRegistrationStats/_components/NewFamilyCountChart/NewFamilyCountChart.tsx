import {BarChart} from "@tremor/react";

type Props = {
  data: {
    date: any;
    count: any;
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
      {payload.map((category: any, idx: number) => (
        <div key={idx} className="flex items-center px-2 pt-2 space-x-2.5">
          <div className={`w-2 h-2 bg-${category.color}-500 rounded`} />
          <p className="text-tremor-content">새가족등록</p>
          <p className="font-medium text-tremor-content-emphasis">
            {category.value} 명
          </p>
        </div>
      ))}
    </div>
  );
};

const NewFamilyCountChart = ({data}: Props) => {
  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>새가족등록 인원 수</span>
          </div>
        </div>
      </div>
      <BarChart
        data={data}
        index="date"
        categories={["count"]}
        colors={["blue"]}
        yAxisWidth={48}
        showLegend={false}
        showXAxis
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default NewFamilyCountChart;
