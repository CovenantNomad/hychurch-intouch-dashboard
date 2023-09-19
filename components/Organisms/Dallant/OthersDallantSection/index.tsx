import React from 'react';
import { useQuery } from 'react-query';
import { getOthersDallents } from '../../../../firebase/Dallant/DallantOthers';
import Spinner from '../../../Atoms/Spinner';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import OthersDallantList from '../OthersDallantList/OthersDallantList';

interface OthersDallantSectionProps {}

const OthersDallantSection = ({}: OthersDallantSectionProps) => {
  const { isLoading, data, isFetching } = useQuery(
    'getOthersDallents', 
    getOthersDallents,
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  return (
    <div>
      <h2 className='text-lg font-medium leading-6 text-gray-900'>미편성 청년 달란트 현황</h2>
      {isLoading || isFetching  ? (
        <div className='grid grid-cols-4 gap-x-4 mt-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
              <div className="h-[8px] w-1/2 bg-slate-200 rounded justify-items-end"></div>
              <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
              <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {data ? (
            <div className='grid grid-cols-4 gap-x-4 mt-4'>
              {data.map(member => (
                <OthersDallantList
                  key={member.userId} 
                  cellId={member.cellId}
                  cellName={member.cellName}
                  userId={member.userId}
                  userName={member.userName}
                  totalAmount={member.totalAmount}
                />
              ))}
            </div>
          ) : (
            <div className='py-8'>
              <EmptyStateSimple />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OthersDallantSection;
