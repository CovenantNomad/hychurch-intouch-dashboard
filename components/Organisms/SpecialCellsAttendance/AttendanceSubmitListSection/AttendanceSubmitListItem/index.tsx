import React from 'react';
import { getServiceName } from '../../../../../utils/utils';
import { AttendanceHistory } from '../../../../../interface/attendance';

type AttendanceSubmitListItemProps = {
  item: AttendanceHistory
}

const AttendanceSubmitListItem = ({ item }: AttendanceSubmitListItemProps) => {
  return (
    <div className='flex justify-between p-4 border'>
      <div>
        <p>{item.user.name}</p>
        <p className='text-sm'>{`${getServiceName(item.churchService.id)} / ${item.isOnline === true ? "온라인예배" : "성전예배"}`}</p>
      </div>
    </div>
  );
};

export default AttendanceSubmitListItem;
