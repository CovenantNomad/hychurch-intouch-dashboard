import React from 'react';

interface SkeletonListItemProps {}

const SkeletonListItem = ({}: SkeletonListItemProps) => {
  return (
    <div className='flex flex-col gap-y-4'>
      {Array.from({ length: 2 }, (_, index) => index).map(item => (
        <div key={item} className="bg-slate-200 rounded-lg shadow-lg w-full h-20 animate-pulse"></div>
      ))}
    </div>
  );
};

export default SkeletonListItem;
