import React from 'react';
import { useQuery } from 'react-query';
import { getOthersDallents } from '../../../../firebase/Dallant/DallantOthers';
import Spinner from '../../../Atoms/Spinner';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import OthersDallantList from '../OthersDallantList/OthersDallantList';

interface OthersDallantSectionProps {}

const OthersDallantSection = ({}: OthersDallantSectionProps) => {
  const { isLoading, data } = useQuery(
    'getOthersDallents', 
    () => getOthersDallents(),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  )

  return (
    <div>
      <h2 className='text-lg font-medium leading-6 text-gray-900'>미편성 청년 달란트 현황</h2>
      {isLoading ? (
        <div className='py-8'>
          <Spinner />
        </div>
      ) : (
        <div>
          {data ? (
            <div className='grid grid-cols-4 gap-4 mt-8'>
              {data.map(member => (
                <div key={member.userId} className='col-span-1'>
                  <OthersDallantList
                    cellId={member.cellId}
                    cellName={member.cellName}
                    userId={member.userId}
                    userName={member.userName}
                    totalAmount={member.totalAmount}
                  />
                </div>
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
