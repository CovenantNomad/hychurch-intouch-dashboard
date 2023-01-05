import React from 'react';

interface SkeletonDoughnutProps {}

const SkeletonChart = ({}: SkeletonDoughnutProps) => {
  return (
    <div className='bg-white w-full h-full min-h-[160px] flex items-center justify-center'>
      <div className="bg-slate-200 w-[95%] h-[85%] rounded-lg shadow-sm animate-pulse"></div>
    </div>
  );
};

export default SkeletonChart;
