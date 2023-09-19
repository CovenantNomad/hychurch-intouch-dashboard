import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { getIndividualStatics } from '../../../../firebase/Dallant/Dallant';
import Spinner from '../../../Atoms/Spinner';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';

interface DallantTotalSectionProps {}

const DallantTotalSection = ({}: DallantTotalSectionProps) => {
  const [ lastestUpdateAt, setLastestUpdateAt ] = useState<string>()
  const { isLoading, data } = useQuery(
    'getOverallStatics', 
    getIndividualStatics, 
    { 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 5 * 60 * 1000 
    }
  )

  useEffect(() => {
    if (data) {
      setLastestUpdateAt(dayjs.unix(data.latestUpdateAt.seconds).format('YYYY. MM. DD (ddd) HH:mm'))
    } else {
      setLastestUpdateAt(dayjs().format('YYYY. MM. DD (ddd) HH:mm'))
    }
  }, [data])

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {data ? (
            <div className='grid grid-cols-3'>
              <div className='col-span-2 text-center'>
                <h2 className='text-lg font-medium text-gray-900'>전체 달란트 발행량</h2>
                <p className='text-5xl font-bold text-gray-900 py-3'>{Number(data.totalAmount || 0).toLocaleString('kr-KR')} D</p>
                <p className='text-sm leading-6 text-gray-500'>(마지막 업데이트 : {lastestUpdateAt})</p>
              </div>
              <div className='col-span-1 flex flex-col items-center justify-center'>
                <p className='text-small'>현재 참여인원</p>
                <p className='text-5xl font-bold text-gray-900 py-3'>{data.participants}명 🏃</p>
              </div>
            </div>
          ) : (
            <>
              <EmptyStateSimple />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DallantTotalSection;
