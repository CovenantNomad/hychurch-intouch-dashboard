import {DonutChart} from "../../../../../../../../../ui/DonutChart";

type Props = {
  data: {
    name: string;
    amout: number;
  }[];
};

const NewFamilySexRatioChart = ({data}: Props) => {
  return (
    <div className="flex justify-center items-center py-4 h-80">
      <DonutChart
        data={data}
        category="name"
        value="amout"
        showLabel={true}
        colors={["blue", "pink"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}명`
        }
      />
    </div>
  );
};

export default NewFamilySexRatioChart;
