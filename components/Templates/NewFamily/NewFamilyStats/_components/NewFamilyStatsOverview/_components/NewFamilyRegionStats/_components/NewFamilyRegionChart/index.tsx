import {DonutChart} from "../../../../../../../../../ui/DonutChart";

type Props = {
  data: {
    name: string;
    amout: number;
  }[];
};

const NewFamilyRegionChart = ({data}: Props) => {
  return (
    <div className="flex justify-center items-center py-4 h-80">
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
    </div>
  );
};

export default NewFamilyRegionChart;
