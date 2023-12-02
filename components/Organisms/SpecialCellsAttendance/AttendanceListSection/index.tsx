import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AttendanceListSectionHeader from './AttendanceListSectionHeader';
import { TempSavedAttendanceHistory } from '../../../../interface/attendance';
import { SubmitAttendanceMutation } from '../../../../graphql/generated';
import { groupByChurchServiceId } from '../../../../utils/utils';
import AttendanceListSectionListItem from './AttendanceListSectionListItem';

type AttendanceListSectionProps = {
  attendanceList: TempSavedAttendanceHistory[] | null
  setIsOpenAttendanceList: Dispatch<SetStateAction<boolean>>;
  onRemoveHandler: (userId: string, churchServiceId: string) => void;
  onTemporarySaveHandler: () => Promise<{ result: SubmitAttendanceMutation }>;
  onSubmitHandler: () => Promise<{ result: SubmitAttendanceMutation }>;
  onResetList: () => void
}

const AttendanceListSection = ({ attendanceList, setIsOpenAttendanceList, onRemoveHandler, onTemporarySaveHandler, onSubmitHandler, onResetList }: AttendanceListSectionProps) => {
  const [ groupedByService, setGroupedByService ] = useState<{[key: string]: TempSavedAttendanceHistory[]}>()

  useEffect(() => {
    if (attendanceList !== null) {
      setGroupedByService(groupByChurchServiceId(attendanceList))
    }
  }, [attendanceList])

  return (
    <div>
      <AttendanceListSectionHeader setIsOpenAttendanceList={setIsOpenAttendanceList} />
      <div>
        <div className='py-1 border-b'></div>
        <div className='py-6'>
          {attendanceList !== null && attendanceList.length !== 0 ? (
            <div className='space-y-8'>
              {groupedByService && groupedByService['1']?.length > 0 && (
                <div>
                  <div className='mb-2'>
                    <h4 className='font-semibold'>1부예배(07:00) 출석명단</h4>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {groupedByService['1'].sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map((item) => (
                      <AttendanceListSectionListItem key={item.userId} item={item} onRemoveHandler={onRemoveHandler} />
                    ))}
                  </div>
                </div>
              )}
              {groupedByService && groupedByService['2']?.length > 0 && (
                <div>
                  <div className='mb-2'>
                    <h4 className='font-semibold'>2부예배(08:00) 출석명단</h4>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {groupedByService['2'].sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map((item) => (
                      <AttendanceListSectionListItem key={item.userId} item={item} onRemoveHandler={onRemoveHandler} />
                    ))}
                  </div>
                </div>
              )}
              {groupedByService && groupedByService['3']?.length > 0 && (
                <div>
                  <div className='mb-2'>
                    <h4 className='font-semibold'>3부예배(09:30) 출석명단</h4>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {groupedByService['3'].sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map((item) => (
                      <AttendanceListSectionListItem key={item.userId} item={item} onRemoveHandler={onRemoveHandler} />
                    ))}
                  </div>
                </div>
              )}
              {groupedByService && groupedByService['4']?.length > 0 && (
                <div>
                  <div className='mb-2'>
                    <h4 className='font-semibold'>4부예배(11:30) 출석명단</h4>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {groupedByService['4'].sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map((item) => (
                      <AttendanceListSectionListItem key={item.userId} item={item} onRemoveHandler={onRemoveHandler} />
                    ))}
                  </div>
                </div>
              )}
              {groupedByService && groupedByService['5']?.length > 0 && (
                <div>
                  <div className='mb-2'>
                    <h4 className='font-semibold'>청년예배(14:15) 출석명단</h4>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {groupedByService['5'].sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)).map((item) => (
                      <AttendanceListSectionListItem key={item.userId} item={item} onRemoveHandler={onRemoveHandler} />
                    ))}
                  </div>
                </div>
              )}
              <div className='flex'>
                <div className='flex-1 flex'>
                  <div className='flex-1 p-3'>
                    <button 
                      onClick={onResetList}
                      className='h-14 w-full border font-bold'
                    >
                      모두삭제
                    </button>
                  </div>
                  <div className='flex-1 p-3'>
                    <button 
                      onClick={onTemporarySaveHandler}
                      className='h-14 w-full border font-bold'
                    >
                      임시저장
                    </button>
                  </div>
                </div>
                <div className='flex-1 p-3'>
                  <button 
                    onClick={async () => {
                      const { result } = await onSubmitHandler()
                      if (result.submitCellMemberChurchServiceAttendanceHistories.success) {
                        setIsOpenAttendanceList(false)
                      }
                    }}
                    className='h-14 w-full bg-black text-white font-bold'
                  >
                    제출하기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center py-20'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.684 12.174c.75 0 1.41-.41 1.75-1.03l3.446-5.917a.996.996 0 0 0-.87-1.48H5.734L5.061 2.52A1 1 0 0 0 4.184 2H2.856a.865.865 0 0 0-.865.874.882.882 0 0 0 .883.873H4l3.6 7.59-1.35 2.44c-.73 1.34.23 2.406 1.75 2.406h11.282a.718.718 0 1 0 0-1.436H7.336l1.234-2.573h8.114ZM6.18 5.03h14.147l-3.264 5.716H8.878L6.18 5.031ZM8.45 17.747a2.45 2.45 0 1 1 0 4.9 2.45 2.45 0 0 1 0-4.9Zm0 1.3a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3ZM17.45 17.747a2.45 2.45 0 1 1 0 4.9 2.45 2.45 0 0 1 0-4.9Zm0 1.3a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z" fill="#777"></path>
              </svg>
              <div className='text-center space-y-2 mt-4'>
                <p className='text-gray-500'>출석리스트가 비어있습니다</p>
                <p className='text-sm text-gray-400'>출석을 추가 해보세요</p>
              </div>
              <div className='w-full flex justify-center mt-4'>
                <div className='w-80 p-3'>
                  <button 
                    onClick={() => setIsOpenAttendanceList(false)}
                    className='h-14 w-full border font-bold'
                  >
                    셀원명단 보러가기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceListSection;
