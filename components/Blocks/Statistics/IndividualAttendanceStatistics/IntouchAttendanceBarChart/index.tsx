import React from 'react';

interface IntouchAttendanceBarChartProps {
  title: string;
  numberOfAttendance: number
}

const IntouchAttendanceBarChart = ({ title, numberOfAttendance }: IntouchAttendanceBarChartProps) => {
  const percentage = numberOfAttendance / 4 * 100

  return (
    <div className='p-4 border rounded-lg'>
      <p className='text-center'>{title}</p>
      <div className=''>
        <p className='text-lg font-bold text-center py-4'>
          {numberOfAttendance}회
          <span className='block text-sm font-normal text-gray-500'>({percentage}%)</span>
        </p>
        <div>
          <div>
            <div className="w-full h-2 border border-gray-300 rounded-md overflow-hidden">
              <div className={`${numberOfAttendance === 4 ? "w-full" : numberOfAttendance === 3 ? 'w-[75%]' : numberOfAttendance === 2 ? 'w-[50%]' : 'w-[25%]'} h-2 bg-red-500`}></div>
            </div>
            <div className="w-full flex justify-between">
                <span className='flex-1 text-xs text-right text-gray-500'>25%</span>
                <span className='flex-1 text-xs text-right text-gray-500'>50%</span>
                <span className='flex-1 text-xs text-right text-gray-500'>75%</span>
                <span className='flex-1 text-xs text-right text-gray-500'>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntouchAttendanceBarChart;
