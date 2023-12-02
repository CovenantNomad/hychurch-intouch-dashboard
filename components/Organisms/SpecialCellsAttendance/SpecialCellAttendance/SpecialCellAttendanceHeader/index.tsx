import React, { Dispatch, SetStateAction, useState } from 'react';
import { SimpleMemberWithRole } from '../../../../../interface/user';
import SearchButton from '../../../../Atoms/SearchButton';
import SearchAndSelectModal from '../../../../Blocks/SearchAndSelectModal';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import { TempSavedAttendanceHistory } from '../../../../../interface/attendance';

type SpecialCellAttendanceHeaderProps = {
  memberList: SimpleMemberWithRole[];
  attendanceList: TempSavedAttendanceHistory[] | null;
  setSearchedMember: Dispatch<SetStateAction<SimpleMemberWithRole[] | null>>;
  setIsOpenAttendanceList: Dispatch<SetStateAction<boolean>>;
}

const SpecialCellAttendanceHeader = ({ memberList, attendanceList, setSearchedMember, setIsOpenAttendanceList }: SpecialCellAttendanceHeaderProps) => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <div>
      <div className='relative w-full h-16 flex justify-center items-center'>
        <SearchButton 
          placeholder={'이름으로 검색하세요'}
          onClickHandler={() => setOpen(true)}
        />
        <div className='absolute right-0'>
          <div className='relative w-16 h-16 flex justify-center items-center cursor-pointer' onClick={() => setIsOpenAttendanceList(true)}>
            <ArchiveBoxArrowDownIcon className="h-8 w-8 text-slate-900" />
            <div className='absolute top-2 right-1 w-6 h-6 flex justify-center items-center rounded-full bg-black z-10'>
              <span className='text-xs text-white'>{attendanceList?.length ? attendanceList.length : 0}</span>
            </div>
          </div>
        </div>
      </div>
      <SearchAndSelectModal
        people={memberList}
        open={open}
        setOpen={setOpen}
        query={query}
        setQuery={setQuery}
        setSearchedMember={setSearchedMember}
      />
    </div>
  );
};

export default SpecialCellAttendanceHeader;
