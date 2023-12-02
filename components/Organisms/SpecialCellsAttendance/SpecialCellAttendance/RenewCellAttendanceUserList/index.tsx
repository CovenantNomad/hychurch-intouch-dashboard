import React, { Dispatch, SetStateAction, useState } from 'react';
import { SimpleMemberWithRole } from '../../../../../interface/user';
import { RoleType } from '../../../../../graphql/generated';
import AttendanceSidePanel from '../../AttendanceSidePanel';
import { onSaveAttendanceListPrpsType } from '../../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit';
import { TempSavedAttendanceHistory } from '../../../../../interface/attendance';
import SpecialCellAttendanceUserListItem from '../SpecialCellAttendanceUserListItem';

type SpecialCellAttendanceUserListProps = {
  cellName: string;
  memberList: SimpleMemberWithRole[];
  attendanceList: TempSavedAttendanceHistory[] | null;
  searchedMember: SimpleMemberWithRole[] | null;
  setSearchedMember: Dispatch<SetStateAction<SimpleMemberWithRole[] | null>>;
  onSaveAttendanceList: ({ userId, userName, churchServiceId, isOnline }: onSaveAttendanceListPrpsType) => void
}

export type selectedAttendanceMember = {
  userId: string;
  userName: string;
}

const RenewCellAttendanceUserList = ({ cellName, memberList, attendanceList, searchedMember, setSearchedMember, onSaveAttendanceList }: SpecialCellAttendanceUserListProps) => {
  const [ open, setOpen ] = useState(false)
  const [ selectedMember, setSeletedMember ] = useState<selectedAttendanceMember | null>(null)

  return (
    <div>
      <div className='flex justify-between py-4 px-3 text-sm text-gray-500 border-b'>
        <span>{cellName} {memberList.length}</span>
        <span>이름순</span>
      </div>
      <div className='py-6'>
        <div className='grid grid-cols-6 gap-4'>
          {memberList
            .filter((member) => member.roles.includes(RoleType.CellLeader))
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .map(member => (
              <SpecialCellAttendanceUserListItem 
                key={member.id} 
                member={member} 
                attendanceList={attendanceList}
                setOpen={setOpen} 
                setSeletedMember={setSeletedMember}
                onSaveAttendanceList={onSaveAttendanceList}
              />
            ))
          }
        </div>
        {searchedMember ? (
          <div className='mt-6'>
            <div className='px-3 mb-6'>
              <span className='text-sm text-gray-500'>검색결과 : {searchedMember.length}</span>
            </div>
            <div className='grid grid-cols-6 gap-4'>
              {searchedMember
                .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
                .map(member => (
                  <SpecialCellAttendanceUserListItem 
                    key={member.id} 
                    member={member} 
                    attendanceList={attendanceList}
                    setOpen={setOpen} 
                    setSeletedMember={setSeletedMember}
                    onSaveAttendanceList={onSaveAttendanceList}
                  />
                ))
              }
            </div>
            <div className='mt-16'>
              <div className='w-full flex justify-center py-3'>
                <button 
                  onClick={() => setSearchedMember(null)}
                  className='h-14 w-full max-w-xl font-bold bg-black text-white'
                >
                  검색결과 초기화
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='mt-8 py-4'>
            <div>
              <p className='font-bold text-center'>검색 후 추가하여 진행해주세요</p>
            </div>
          </div>
        )}
      </div>
      <AttendanceSidePanel selectedMember={selectedMember} open={open} setOpen={setOpen} attendanceList={attendanceList} onSaveAttendanceList={onSaveAttendanceList} />
    </div>
  );
};

export default RenewCellAttendanceUserList;
