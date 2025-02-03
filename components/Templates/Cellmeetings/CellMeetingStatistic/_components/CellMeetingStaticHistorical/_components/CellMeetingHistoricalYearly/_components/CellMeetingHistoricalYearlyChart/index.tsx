import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

type Props = {};

const CellMeetingHistoricalYearlyChart = ({}: Props) => {
  return (
    <div className="h-32 flex flex-col justify-center items-center space-y-1">
      <ExclamationTriangleIcon className="h-6 w-6" />
      <span className="text-sm text-gray-500">
        데이터 수가 작아서 차트로 제공되지 않습니다.
      </span>
    </div>
  );
};

export default CellMeetingHistoricalYearlyChart;
