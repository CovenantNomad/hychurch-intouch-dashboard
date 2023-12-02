import React, { useEffect, useState } from 'react';
import { AttendanceHistory } from '../../../../interface/attendance';
import { groupBySubmitListByChurchServiceId } from '../../../../utils/utils';
import AttendanceSubmitListItem from './AttendanceSubmitListItem';

type AttendanceSubmitListSectionProps = {
  attendanceSubmitList: AttendanceHistory[] | null
}

const AttendanceSubmitListSection = ({ attendanceSubmitList }: AttendanceSubmitListSectionProps) => {
  const [ groupedByService, setGroupedByService ] = useState<{[key: string]: AttendanceHistory[]}>()

  useEffect(() => {
    if (attendanceSubmitList !== null) {
      setGroupedByService(groupBySubmitListByChurchServiceId(attendanceSubmitList))
    }
  }, [attendanceSubmitList])

  return (
    <div className='py-6'>
      {attendanceSubmitList !== null && attendanceSubmitList.length !== 0 ? (
        <div className='space-y-8'>
          {groupedByService && groupedByService['1']?.length > 0 && (
            <div>
              <div className='mb-2'>
                <h4 className='font-semibold'>1부예배(07:00) 출석명단</h4>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                {groupedByService['1'].sort((a, b) => (a.user.name < b.user.name ? -1 : a.user.name > b.user.name ? 1 : 0)).map((item) => (
                  <AttendanceSubmitListItem key={item.user.id} item={item} />
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
                {groupedByService['2'].sort((a, b) => (a.user.name < b.user.name ? -1 : a.user.name > b.user.name ? 1 : 0)).map((item) => (
                  <AttendanceSubmitListItem key={item.user.id} item={item} />
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
                {groupedByService['3'].sort((a, b) => (a.user.name < b.user.name ? -1 : a.user.name > b.user.name ? 1 : 0)).map((item) => (
                  <AttendanceSubmitListItem key={item.user.id} item={item} />
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
                {groupedByService['4'].sort((a, b) => (a.user.name < b.user.name ? -1 : a.user.name > b.user.name ? 1 : 0)).map((item) => (
                  <AttendanceSubmitListItem key={item.user.id} item={item} />
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
                {groupedByService['5'].sort((a, b) => (a.user.name < b.user.name ? -1 : a.user.name > b.user.name ? 1 : 0)).map((item) => (
                  <AttendanceSubmitListItem key={item.user.id} item={item} />
                ))}
              </div>
            </div>
          )}
          
        </div>
      ) : (
        <div>

        </div>
      )}
    </div>
  );
};

export default AttendanceSubmitListSection;
