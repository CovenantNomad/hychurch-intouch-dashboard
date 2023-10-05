import React from 'react';
import { CheckIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { mockMemberType } from '../../../../Organisms/Statistics/AttendanceStatistics/WorshipAttendanceStatus';

interface MemberAttendanceListItemProps {
  member: mockMemberType
  onSelectHandler: (id: string, name: string) => void;
}

const MemberAttendanceListItem = ({ member, onSelectHandler }: MemberAttendanceListItemProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => onSelectHandler(member.id, member.name)}
        className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 py-2 px-8 text-left shadow-sm hover:bg-gray-50"
      >
        <span className="flex min-w-0 flex-1 items-center space-x-3">
          <span className="block min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-gray-900">{member.name}</span>
          </span>
        </span>
        <div className='flex gap-x-5'>
          <div className='w-10'>
            <p className='text-xs text-center'>예배</p>
            <span className="flex items-center justify-center pt-1">
              {!member.attended ? (
                <XMarkIcon className='h-5 w-5 text-rose-700'/>
              ) : (
                <>
                {member.onSite ? (
                  <CheckIcon className='h-5 w-5 text-teal-700'/>
                ) : (
                  <VideoCameraIcon className='h-5 w-5 text-teal-700'/>
                )}
                </>
              )}
            </span>
          </div>
          <div className='w-10'>
            <p className='text-xs text-center'>셀모임</p>
            <span className="flex items-center justify-center pt-1">
              {member.cellMeeting ? (
                <CheckIcon className='h-5 w-5 text-teal-700'/>
              ) : (
                <XMarkIcon className='h-5 w-5 text-rose-700'/>
              )}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MemberAttendanceListItem;
