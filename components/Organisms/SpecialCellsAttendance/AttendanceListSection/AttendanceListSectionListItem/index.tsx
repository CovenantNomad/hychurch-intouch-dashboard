import React from 'react';
import { getServiceName } from '../../../../../utils/utils';
import { TempSavedAttendanceHistory } from '../../../../../interface/attendance';
import { XMarkIcon } from '@heroicons/react/24/outline';

type AttendanceListSectionListItemProps = {
  item: TempSavedAttendanceHistory
  onRemoveHandler: (userId: string, churchServiceId: string) => void;
}

const AttendanceListSectionListItem = ({ item, onRemoveHandler }: AttendanceListSectionListItemProps) => {
  return (
    <div className='flex justify-between p-4 border'>
      <div>
        <p>{item.userName}</p>
        <p className='text-sm'>{`${getServiceName(item.churchServiceId)} / ${item.isOnline === true ? "온라인예배" : "성전예배"}`}</p>
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
