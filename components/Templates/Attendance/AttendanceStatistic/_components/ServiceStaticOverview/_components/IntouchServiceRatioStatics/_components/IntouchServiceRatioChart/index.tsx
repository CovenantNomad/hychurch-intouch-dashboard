import {BarChart} from "@tremor/react";

type Props = {
  data: {
    date: string;
    fifthOff?: number;
    nonCellMember?: number;
  }[];
};

const CustomTooltip = ({active, payload, label}: any) => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded shadow">
      <p className="font-bold text-gray-800">{label}</p>
      {payload.map((item: any, idx: number) => (
        <div key={idx} className="flex items-center space-x-2 mt-2">
          <div
            className={`w-3 h-3 rounded ${
              item.dataKey === "fifthOff" ? "bg-blue-500" : "bg-cyan-500"
            }`}
          ></div>
          <p className="text-sm">
            {item.dataKey === "fifthOff"
              ? "셀편성된 예배자"
              : "미편성된 예배자"}
          </p>
          <p className="text-sm font-semibold">{item.value} 명</p>
        </div>
      ))}
    </div>
  );
};

const IntouchServiceRatioChart = ({data}: Props) => {
  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>셀편성된 예배자</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
            <span>미편성된 예배자</span>
          </div>
        </div>
      </div>
      <BarChart
        data={data}
        index="date"
        categories={["fifthOff", "nonCellMember"]}
        colors={["blue", "cyan"]}
        showLegend={false}
        customTooltip={CustomTooltip}
      />
    </div>
  );
};

export default IntouchServiceRatioChart;
