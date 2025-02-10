import BarnabasTotalRecord from "./_components/BarnabasTotalRecord";
import BarnabasYearlyRecord from "./_components/BarnabasYearlyRecord";

type Props = {
  id: string;
};

const BarnabasProfileBody = ({id}: Props) => {
  return (
    <div className="flex justify-between space-x-8">
      <BarnabasTotalRecord id={id} />
      <BarnabasYearlyRecord id={id} />
    </div>
  );
};

export default BarnabasProfileBody;
