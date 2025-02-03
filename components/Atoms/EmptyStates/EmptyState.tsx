import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

type Props = {
  text: string;
};

const EmptyState = ({text}: Props) => {
  return (
    <div className="h-[360px] flex flex-col justify-center items-center">
      <ExclamationTriangleIcon className="h-6 w-6" />
      <span className="block text-sm text-gray-600 mt-1">{text}</span>
    </div>
  );
};

export default EmptyState;
