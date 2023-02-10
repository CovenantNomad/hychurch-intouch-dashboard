import React from 'react';

interface SkeletonTranferProps {}

const SkeletonTranfer = ({}: SkeletonTranferProps) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {Array.from({ length: 8 }, (_, index) => index).map(item => (
        <div key={item} className="bg-slate-200 rounded-lg shadow-lg w-20 h-10 animate-pulse"></div>
      ))}
    </div>
  );
};

export default SkeletonTranfer;
