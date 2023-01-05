import React from 'react';

interface SkeletonTableProps {}

const SkeletonTable = ({}: SkeletonTableProps) => {
  return (
    <div className='relative bg-white w-full h-[320px] flex flex-col items-center justify-center'>
      <div className="bg-slate-200 w-[95%] h-[15%] mb-4 rounded-lg shadow-sm animate-pulse" />
      <div className="bg-slate-200 w-[95%] h-[60%] rounded-lg shadow-sm animate-pulse" />
    </div>
  );
};

export default SkeletonTable;
