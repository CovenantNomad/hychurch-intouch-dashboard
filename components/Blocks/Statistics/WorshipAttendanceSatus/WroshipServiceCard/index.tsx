import React from 'react';
import MemberAttendanceListItem from '../MemberAttendanceListItem';
import { AttendanceMemberType } from '../../../../../interface/attendance';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

interface WroshipServiceCardProps {
  title: string;
  memberList: AttendanceMemberType[]
  onSelectHandler: (id: string, name: string) => void;
}

const WroshipServiceCard = ({ title, memberList, onSelectHandler }: WroshipServiceCardProps) => {
  return (
    <div className='px-2 py-4'>
      <p className='text-sm font-medium text-gray-500'>{title}</p>
      <div>
        {memberList.length !== 0 ? (
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {memberList.map(member => (
              <MemberAttendanceListItem 
                key={member.id}
                member={member}
                onSelectHandler={onSelectHandler}
              />
            ))}
          </div>
        ) : (
          <div
            className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center mt-4"
          >
            <NoSymbolIcon className='w-6 h-6 text-gray-400'/>
            <p className="mt-4 text-sm font-semibold text-gray-900">해당되는 셀원이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WroshipServiceCard;
