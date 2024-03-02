import React from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import CellMeetingCellStaticSection from '../../../Organisms/Attendance/CellMeetingCellStaticSection';
import CellMeetingLastFourWeekStatic from '../../../Organisms/Attendance/CellMeetingLastFourWeekStatic';
import CellMeetingSeasonOverviewChart from '../../../Organisms/Attendance/CellMeetingSeasonOverviewChart';
import CellMeetingSeasonOverviewTable from '../../../Organisms/Attendance/CellMeetingSeasonOverviewTable';
import CellMeetingMonthlyStatic from '../../../Organisms/Attendance/CellMeetingMonthlyStatic';


const CellMeetingStatistic = () => {

  return (
    <>
      <BlockContainer firstBlock>
        <CellMeetingSeasonOverviewChart />
      </BlockContainer>
      <BlockContainer>
        <div className='grid grid-cols-12 gap-x-6 3xl:gap-x-8'>
          <div className='col-span-3'>
            <CellMeetingSeasonOverviewTable />
          </div>
          <div className='col-span-3'>
          <CellMeetingLastFourWeekStatic />
          </div>
          <div className='col-span-6'>
            <CellMeetingMonthlyStatic />
          </div>
        </div>
      </BlockContainer>
      <BlockContainer>
        <CellMeetingCellStaticSection />
      </BlockContainer>
    </>
  );
};

export default CellMeetingStatistic;
