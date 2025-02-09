import {ClockIcon} from "@heroicons/react/24/outline";

export const TimeDisplay = ({hour, minute}: {hour: string; minute: string}) => (
  <div className="flex items-center space-x-2">
    <ClockIcon className="h-4 w-4" />
    <span className="text-sm">
      {hour}:{minute}
    </span>
  </div>
);
