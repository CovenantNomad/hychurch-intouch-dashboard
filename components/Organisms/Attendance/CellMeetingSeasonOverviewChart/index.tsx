import React from 'react';
import CellMeetingSeasonNumberChart from './CellMeetingSeasonNumberChart';
import CellMeetingSeasonAverageChart from './CellMeetingSeasonAverageChart';

type CellMeetingOverviewChartProps = {}

const CellMeetingSeasonOverviewChart = ({}: CellMeetingOverviewChartProps) => {
  return (
    <div className='3xl:grid 3xl:grid-cols-2 3xl:gap-x-8'>
      <div className='border rounded-md p-4 3xl:col-span-1'>
        <CellMeetingSeasonNumberChart/>
      </div>
      <div className='border rounded-md p-4 mt-4 3xl:col-span-1 3xl:mt-0'>
        <CellMeetingSeasonAverageChart />
      </div>
    </div>
  );
};

export default CellMeetingSeasonOverviewChart;
