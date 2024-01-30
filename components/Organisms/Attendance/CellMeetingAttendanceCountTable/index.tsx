import { Dayjs } from 'dayjs';
import React from 'react';
import { getThisWeekCellMeetingStatics } from '../../../../firebase/CellMeeting/CellMeeting';
import { useQuery } from 'react-query';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import Skeleton from '../../../Atoms/Skeleton/Skeleton';

type CellMeetingAttendanceCountTableProps = {
  recentSunday: Dayjs
}

const CellMeetingAttendanceCountTable = ({ recentSunday }: CellMeetingAttendanceCountTableProps) => {
  const baseDateString = recentSunday.format('YYYY-MM-DD')

  const { isLoading, isFetching, data } = useQuery(
    ['getThisWeekCellMeetingStatics', baseDateString], 
    () => getThisWeekCellMeetingStatics(baseDateString),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  return (
    <div className='flex flex-col items-end'>
      <div className='w-full max-w-sm ml-auto mt-8 border divide-y'>
        <div className='flex items-center px-4'>
          <div className='flex-1 py-2'>
            <span>셀편성 인원</span>
          </div>
          <div className='flex-[2] py-2 border-l'>
            {isLoading || isFetching ? (
              <div className='flex justify-end'>
                <Skeleton className='h-[18px] w-9' />
              </div>
            ) : (
              <div className='flex justify-end'>
                {data ? (
                  <span>{data.totalNumber} 명</span>
                ) : (
                  <span>데이터가 없습니다</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center px-4'>
          <div className='flex-1 py-2'>
            <span>참석 인원</span>
          </div>
          <div className='flex-[2] py-2 border-l'>
            {isLoading || isFetching ? (
              <div className='flex justify-end'>
                <Skeleton className='h-[18px] w-9' />
              </div>
            ) : (
              <div className='flex flex-col items-end'>
                {data ? (
                  <>
                    <span className='block'>{data.attendanceNumber} 명</span>
                    <span className='block text-sm'>({isNaN((data.attendanceNumber / data.totalNumber * 100)) ? 0 : (data.attendanceNumber / data.totalNumber * 100).toFixed(2)}%)</span>
                  </>
                ) : (
                  <span>데이터가 없습니다</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center px-4'>
          <div className='flex-1 py-2'>
            <span>미참석 인원</span>
          </div>
          <div className='flex-[2] py-2 border-l'>
            {isLoading || isFetching ? (
              <div className='flex justify-end'>
                <Skeleton className='h-[18px] w-9' />
              </div>
            ) : (
              <div className='flex flex-col items-end'>
                {data ? (
                  <>
                    <span className='block'>{data.absentNumber} 명</span>
                    <span className='block text-sm'>({isNaN(data.absentNumber / data.totalNumber * 100) ? 0 : (data.absentNumber / data.totalNumber * 100).toFixed(2)}%)</span>
                  </>
                ) : (
                  <span>데이터가 없습니다</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className='text-right text-sm text-gray-500 mt-3'>
        해당통계는 현재까지 제출된 내용으로 집계됩니다.
        <br />
        모든 셀이 제출완료하면 전체인원은 셀편성 된 전체인원이 됩니다.
      </p>
    </div>
  );
};

export default CellMeetingAttendanceCountTable;
