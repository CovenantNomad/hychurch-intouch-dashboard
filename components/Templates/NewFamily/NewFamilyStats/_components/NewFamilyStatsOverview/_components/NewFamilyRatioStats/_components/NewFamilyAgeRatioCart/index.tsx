import {BarChart} from "@tremor/react";

type Props = {
  data: {
    date: string;
    group1: number;
    group2: number;
    group3: number;
    group4: number;
    group5: number;
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
          <p className="text-tremor-content">
            {category.name === "group1"
              ? "1청년"
              : category.name === "group2"
              ? "2청년"
              : category.name === "group3"
              ? "3청년"
              : category.name === "group4"
              ? "4청년"
              : "5청년"}
          </p>
          <p className="font-medium text-tremor-content-emphasis">
            {category.value} 명
          </p>
        </div>
      ))}
    </div>
  );
};

const NewFamilyAgeRatioCart = ({data}: Props) => {
  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>1청년</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
            <span>2청년</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            <span>3청년</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>4청년</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>5청년</span>
          </div>
        </div>
      </div>
      <BarChart
        data={data}
        index="date"
        categories={["group1", "group2", "group3", "group4", "group5"]}
        showLegend={false}
        showXAxis={false}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default NewFamilyAgeRatioCart;
