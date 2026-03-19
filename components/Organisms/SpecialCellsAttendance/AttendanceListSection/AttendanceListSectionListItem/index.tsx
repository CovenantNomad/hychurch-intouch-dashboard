import {XMarkIcon} from "@heroicons/react/24/outline";
import {TempSavedAttendanceHistory} from "../../../../../interface/attendance";
import {getServiceName} from "../../../../../utils/utils";

type AttendanceListSectionListItemProps = {
  item: TempSavedAttendanceHistory;
  onRemoveHandler: (userId: string, churchServiceId: string) => void;
};

const AttendanceListSectionListItem = ({
  item,
  onRemoveHandler,
}: AttendanceListSectionListItemProps) => {
  return (
    <div className="flex justify-between p-4 border rounded-lg bg-white">
      <div>
        <p>{item.userName}</p>
        <p
          className={`text-sm ${item.isOnline === true ? "text-blue-500" : ""}`}
        >{`${getServiceName(item.churchServiceId)} | ${item.isOnline === true ? "온라인" : "성전"}`}</p>
      </div>
      <button
        type="button"
        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => onRemoveHandler(item.userId, item.churchServiceId)}
      >
        <span className="absolute -inset-2.5" />
        <span className="sr-only">Close panel</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default AttendanceListSectionListItem;
