import React, { Dispatch, SetStateAction } from 'react';
import { SimpleMemberWithRole } from '../../../../../interface/user';
import { getGender } from '../../../../../utils/utils';
import { selectedAttendanceMember } from '../SpecialCellAttendanceUserList';
import { TempSavedAttendanceHistory } from '../../../../../interface/attendance';
import { CheckIcon } from '@heroicons/react/24/outline';
import { onSaveAttendanceListPrpsType } from '../../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit';
import toast from 'react-hot-toast';

type SpecialCellAttendanceUserListItemProps = {
  member: SimpleMemberWithRole
  attendanceList: TempSavedAttendanceHistory[] | null
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSeletedMember: Dispatch<React.SetStateAction<selectedAttendanceMember | null>>
  onSaveAttendanceList: ({ userId, userName, churchServiceId, isOnline }: onSaveAttendanceListPrpsType) => void
}

const SpecialCellAttendanceUserListItem = ({ member, attendanceList, setOpen, setSeletedMember, onSaveAttendanceList }: SpecialCellAttendanceUserListItemProps) => {

  const onSaveOfflineAttendanceHandler = () => {
    try {
      onSaveAttendanceList({
        userId: member.id,
        userName: member.name,
        churchServiceId: "5",
        isOnline: false
      })
      toast.success("예배출석명단에 저장되었습니다.")
    } catch {
      toast.error("저장 중에 에러가 발생하였습니다.")
    }
  }

  const onSaveOnlineAttendanceHandler = () => {
    try {
      onSaveAttendanceList({
        userId: member.id,
        userName: member.name,
        churchServiceId: "5",
        isOnline: true
      })
      toast.success("예배출석명단에 저장되었습니다.")
    } catch {
      toast.error("저장 중에 에러가 발생하였습니다.")
    }
  }


  return (
    <div className='border hover:ring-2 hover:ring-gray-600'>
      <div 
        onClick={() => {
          setSeletedMember({
            userId: member.id,
            userName: member.name
          })
          setOpen(true)
        }}
        className='flex flex-col items-center justify-center py-6 px-3'
      >
        <span className='text-lg font-bold'>{member.name}</span>
        <span className='text-sm'>{member.gender && getGender(member.gender)}</span>
        <span className='text-sm mt-2'>{member.birthday?.split("-")[0]} 년생</span>
      </div>

      <div className='flex'>
        <div className='flex-shrink-[1] flex-grow-[1] flex items-center justify-center'>
          <button
            onClick={onSaveOnlineAttendanceHandler}
            disabled={!!attendanceList?.find(item => item.userId === member.id && item.churchServiceId === "5")} 
            className='w-full flex justify-center text-sm py-2 border-t border--t-gray-500 text-gray-500 disabled:bg-gray-300 disabled:line-through'
          >
            {attendanceList && attendanceList.find(item => item.userId === member.id && item.churchServiceId === "5" && item.isOnline) ? (
              <CheckIcon className='h-5 w-5 text-black'/>
            ) : (
              <span>온라인</span>
            )}
          </button>
        </div>
        <div className='flex-shrink-[3] flex-grow-[3]'>
          <button
            onClick={onSaveOfflineAttendanceHandler}
            disabled={!!attendanceList?.find(item => item.userId === member.id && item.churchServiceId === "5")}  
            className='w-full h-full flex justify-center py-2 bg-black text-sm text-white disabled:line-through'
          >
            {attendanceList && attendanceList.find(item => item.userId === member.id && item.churchServiceId === "5" && !item.isOnline) ? (
              <CheckIcon className='h-5 w-5 text-white-600'/>
            ) : (
              <span>인터치출석</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCellAttendanceUserListItem;
