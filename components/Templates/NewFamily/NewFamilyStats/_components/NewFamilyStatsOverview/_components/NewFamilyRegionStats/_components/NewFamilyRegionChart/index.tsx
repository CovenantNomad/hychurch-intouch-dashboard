import {DonutChart} from "../../../../../../../../../ui/DonutChart";

type Props = {
  data: {
    name: string;
    amout: number;
  }[];
};

const NewFamilyRegionChart = ({data}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center py-4 h-80">
      <DonutChart
        data={data}
        category="name"
        value="amout"
        showLabel={true}
        colors={["blue", "cyan", "amber"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}명`
        }
      />
      <p className="text-xs text-gray-500 mt-4">
        ※ 주소를 기입하지 않는 청년이 있으면, 총원의 차이가 있습니다
      </p>
    </div>
  );
};

export default NewFamilyRegionChart;
