import React from 'react';
import { IconType } from 'react-icons';

interface StaticListProps {
  icon: JSX.Element
  number: number
  percentage?: number
  title: string
}

const StaticList = ({ icon, number, percentage, title }: StaticListProps) => {
  return (
    <div className='flex items-center py-3'>
      <div className='w-6 mr-2'>
        {icon}
      </div>
      <div className='flex-1'>
        <span className='inline-block w-9 text-lg font-semibold text-right mr-1'>{number}명</span>
        {percentage && (
          <span className='inline-block text-sm'>({percentage}%)</span>
        )}
      </div>
      <span className='inline-block text-sm text-right text-slate-600'>{title}</span>
    </div>
  );
};

export default StaticList;
