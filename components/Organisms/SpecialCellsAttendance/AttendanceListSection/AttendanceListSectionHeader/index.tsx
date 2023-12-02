import { BackwardIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, SetStateAction } from 'react';

type AttendanceListSectionHeaderProps = {
  setIsOpenAttendanceList: Dispatch<SetStateAction<boolean>>;
}

const AttendanceListSectionHeader = ({ setIsOpenAttendanceList }: AttendanceListSectionHeaderProps) => {
  return (
    <div className='relative w-full h-16 flex justify-center items-center'>
      <div className='absolute left-0 p-2 cursor-pointer' onClick={() => setIsOpenAttendanceList(false)}>
        <ChevronLeftIcon className="h-6 w-6 text-slate-900"/>
      </div>
      <h3>이번주 새가족부 예배출석 명단</h3>
    </div>
  );
};

export default AttendanceListSectionHeader;
