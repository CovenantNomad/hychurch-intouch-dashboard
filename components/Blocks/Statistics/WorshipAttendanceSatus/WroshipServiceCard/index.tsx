import React from 'react';
import { mockMemberType } from '../../../../Organisms/Statistics/AttendanceStatistics/WorshipAttendanceStatus';
import MemberAttendanceListItem from '../MemberAttendanceListItem';

interface WroshipServiceCardProps {
  title: string;
  memberList: mockMemberType[] | null
  onSelectHandler: (id: string, name: string) => void;
}

const WroshipServiceCard = ({ title, memberList, onSelectHandler }: WroshipServiceCardProps) => {
  return (
    <div className='px-2 py-4'>
      <p className='text-sm font-medium text-gray-500'>{title}</p>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {memberList?.map(member => (
            <MemberAttendanceListItem 
              key={member.id}
              member={member}
              onSelectHandler={onSelectHandler}
            />
          ))}
        </div>
    </div>
  );
};

export default WroshipServiceCard;
