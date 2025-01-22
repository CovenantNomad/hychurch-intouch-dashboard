import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

type Props = {};

const NewFamilyStatsHistorical = ({}: Props) => {
  return (
    <div
      className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
    >
      <div className="h-32 flex flex-col justify-center items-center space-y-1">
        <ExclamationTriangleIcon className="h-6 w-6" />
        <span className="text-sm text-gray-500">
          2025년부터 데이터를 저장하고 있어서 데이터가 충분히 쌓이면
          개발하겠습니다.
        </span>
      </div>
    </div>
  );
};

export default NewFamilyStatsHistorical;
