type Props = {
  title: string;
  number: string;
  compare: string;
};

const MetricBox = ({title, number, compare}: Props) => {
  return (
    <div className="p-5 border rounded-lg">
      <div>{title}</div>
      <div className="text-2xl font-bold mt-2">{number}명</div>
      <div className="text-sm text-gray-500 mt-0.5">{compare}</div>
    </div>
  );
};

export default MetricBox;
