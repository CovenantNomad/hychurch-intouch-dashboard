import React from 'react';
import { TabProps } from '../../../pages/organizations/[id]';
import { FaUser, FaUserCheck, FaUserTimes } from 'react-icons/fa';

interface MemberStaticProps {
  tabs: TabProps[]
}

const MemberStatic = ({ tabs }: MemberStaticProps) => {

  return (
    <div className='relative h-full'>
      <div className='h-[15%]'>
        <p className='font-bold tracking-wide'>셀원통계</p>
      </div>
      <div className='relative h-[85%] px-4 divide-y rounded-md bg-white'>
        <p className='flex items-center h-1/3'>
          <FaUser size={16} />
          <span className='inline-block pl-3 text-[20px] font-semibold w-14 text-right'>{tabs.filter(tab => tab.name === 'All')[0].count}명</span>
          <span className='inline-block pl-3 text-[14px] text-slate-600'>셀원총원</span>
        </p>
        <p className='flex items-center h-1/3'>
          <FaUserCheck size={16} />
          <span className='inline-block pl-3 text-[20px] font-semibold w-14 text-right'>{tabs.filter(tab => tab.name === 'Active')[0].count}명</span>
          <span className='inline-block pl-2 text-[14px]'>({Math.round((tabs.filter(tab => tab.name === 'Active')[0].count/tabs.filter(tab => tab.name === 'All')[0].count*100))}%)</span>
          <span className='inline-block pl-3 text-[14px] text-slate-600'>활동셀원</span>
        </p>
        <p className='flex items-center h-1/3'>
          <FaUserTimes size={16} />
          <span className='inline-block pl-3 text-[20px] font-semibold w-14 text-right'>{tabs.filter(tab => tab.name === 'Inactive')[0].count}명</span>
          <span className='inline-block pl-2 text-[14px]'>({Math.round((tabs.filter(tab => tab.name === 'Inactive')[0].count/tabs.filter(tab => tab.name === 'All')[0].count*100))}%)</span>
          <span className='inline-block pl-3 text-[14px] text-slate-600'>비활동셀원</span>
        </p>
      </div>
    </div>
  );
};

export default MemberStatic;
