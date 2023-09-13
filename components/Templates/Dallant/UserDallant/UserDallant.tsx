import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import Spinner from '../../../Atoms/Spinner';
import { useQuery } from 'react-query';
import { getUserDallant } from '../../../../firebase/Dallant/Dallant';
import UserDallantStatistic from '../../../Organisms/Dallant/UserDallantStatistic/UserDallantStatistic';
import UserDallantHistory from '../../../Organisms/Dallant/UserDallantHistory/UserDallantHistory';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';

interface UserDallantProps {}

const UserDallant = ({}: UserDallantProps) => {
  const router = useRouter()
  const [ cellId, setCellId ] = useState<string | null>(null)

  const { isLoading, data } = useQuery(
    ['getUserDallant', cellId], 
    () => getUserDallant(cellId!),
    {
      enabled: Boolean(cellId)
    }
  )

  useEffect(() => {
    if (router.query.id) {
      if (typeof router.query.userId === 'string'){
        setCellId(router.query.userId)
      } else if (Array.isArray(router.query.userId)) {
        setCellId(router.query.userId[0])
      } else {
        setCellId(null)
      }
    }
  }, [])

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <h5 className="text-2xl font-medium">{router?.query.userName || data?.userName || "청년이름"}</h5>
              <p className="text-sm text-GRAY004">{router?.query.cellName || data?.cellName || "셀이름"}</p>
            </div>
          </div>
        </div>
      </BlockContainer>
      <BlockContainer>
        {data ? (
          <div className='grid grid-cols-3 gap-x-8'>
            <div className='col-span-1 bg-black'>
              <UserDallantStatistic 
                totalAmount={data.totalAmount}
                history={data.history}
              />
            </div>
            <div className='col-span-2'>
              <h5 className="text-2xl font-medium mb-8">적립내역</h5>
              <UserDallantHistory 
                history={data.history}
              />
            </div>
          </div>
        ) : (
          <div className='py-8'>
            <EmptyStateSimple />
          </div>
        )}
      </BlockContainer>
    </>
  );
};

export default UserDallant;
