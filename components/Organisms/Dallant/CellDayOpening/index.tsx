import React from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { getDallentSetting } from '../../../../firebase/Dallant/Dallant';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import Image from 'next/image';
import Spinner from '../../../Atoms/Spinner';
import { openingCellDay } from '../../../../firebase/Dallant/CellDay';

interface CellDayOpeningProps {}

const CellDayOpening = ({}: CellDayOpeningProps) => {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, data } = useQuery("getTalentSetting", getDallentSetting);

  const { mutateAsync } = useMutation(openingCellDay, {
    onSuccess() {
      queryClient.invalidateQueries(['getTalentSetting'])
    },
  })

  return (
    <div>
      {isLoading || isFetching ? (
        <div className='flex justify-center items-center py-6'>
          <Spinner />
        </div>
      ) : (
        <div>
          {data ? (
            <div>
              <div>
                {data.isCellDayOpen ? (
                  <div className='flex flex-col items-center justify-center'>
                    <div>
                      <Image src={'/images/open.png'} width={163} height={141} alt="영업개시"/>
                    </div>
                    <p className='mt-2 text-lg font-semibold'>영업 중입니다. 주문 접수가 가능합니다.</p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center'>
                    <div>
                      <Image src={'/images/close.png'} width={163} height={141} alt="영업종료"/>
                    </div>
                    <p className='mt-2 text-lg font-semibold'>영업이 종료되었습니다. 더 이상 주문을 받지 않습니다</p>
                  </div>
                )}
              </div>
              <div className='flex justify-center mt-12 mb-8'>
                <button
                  onClick={data.isCellDayOpen ? async () => await mutateAsync(false) : async () => await mutateAsync(true)} 
                  className={`rounded-md shadow-sm px-6 py-2 text-sm font-semibold leading-6 text-white ${data.isCellDayOpen ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500"}`}
                >
                  {data.isCellDayOpen ? "영업종료" : "영업개시"}
                </button>
              </div>
            </div>
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      )}
    </div>
  );
};

export default CellDayOpening;
