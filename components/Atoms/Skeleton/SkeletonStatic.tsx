import React from 'react';

interface SkeletonStaticProps {}

const SkeletonStatic = ({}: SkeletonStaticProps) => {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 3 }, (_, index) => index).map(item => (
        <div key={item} className="bg-white w-full rounded-lg shadow-sm h-10 animate-pulse"></div>
      ))}
    </div>
  );
};

export default SkeletonStatic;
