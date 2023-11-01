import React from 'react';
import { mockAttendanceHistoryType } from '../IndividualAttendanceSatus';
import EmptyStateSimple from '../../../../Atoms/EmptyStates/EmptyStateSimple';
import IntouchAttendanceBarChart from '../../../../Blocks/Statistics/IndividualAttendanceStatistics/IntouchAttendanceBarChart';
import IntouchOnSiteStatistic from '../../../../Blocks/Statistics/IndividualAttendanceStatistics/IntouchOnSiteStatistic/IntouchOnSiteStatistic';

interface IndividualAttendanceHistoryStatisticProps {
  attendanceHistoryData: mockAttendanceHistoryType[] | null
}

const IndividualAttendanceHistoryStatistic = ({ attendanceHistoryData }: IndividualAttendanceHistoryStatisticProps) => {
  return (
    <div className="mt-8 flow-root">
      <p className='text-sm font-medium text-gray-500'>최근 4주 출석통계</p>
      {attendanceHistoryData ? (
        <div className='grid grid-cols-1 mt-2 lg:grid-cols-2 lg:gap-4'>
          <IntouchAttendanceBarChart 
            title='인터치예배 참석횟수'
            numberOfAttendance={attendanceHistoryData.filter(item => item.attendedIntouch).length}
          />
          <IntouchOnSiteStatistic 
            numberOfOnSite={attendanceHistoryData.filter(item => item.onSiteIntouch).length}
          />
          <IntouchAttendanceBarChart
            title='셀모임 참석횟수' 
            numberOfAttendance={attendanceHistoryData.filter(item => item.cellMeeting).length}
          />
        </div>
      ) : (
        <div
            className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
          >
          <EmptyStateSimple />
        </div>
      )}
    </div>
  );
};

export default IndividualAttendanceHistoryStatistic;
