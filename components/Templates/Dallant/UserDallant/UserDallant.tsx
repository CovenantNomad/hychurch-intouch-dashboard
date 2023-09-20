import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//fetch
import { useQuery } from 'react-query';
import { getUserDallant } from '../../../../firebase/Dallant/Dallant';
//components
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import UserDallantStatistic from '../../../Organisms/Dallant/UserDallantStatistic';
import UserDallantHistory from '../../../Organisms/Dallant/UserDallantHistory';
import UserDallantHeader from '../../../Organisms/Dallant/UserDallantHeader';

interface UserDallantProps {}

const UserDallant = ({}: UserDallantProps) => {
  const router = useRouter()
  const [ userId, setUserId ] = useState<string>("")
  const { cellName, userName } = router.query

  const { isLoading, isFetching, data } = useQuery(
    ['getUserDallant', userId], 
    () => getUserDallant(userId),
    {
      enabled: Boolean(userId !== ""),
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (router.query.id) {
      if (typeof router.query.userId === 'string'){
        setUserId(router.query.userId)
      } else if (Array.isArray(router.query.userId)) {
        setUserId(router.query.userId[0])
      } else {
        setUserId("")
      }
    }
  }, [])

  return (
    <>
      <BlockContainer firstBlock>
        <UserDallantHeader 
          userName={String(userName)}
          cellName={String(cellName)}
          isLoading={isLoading}
          isFetching={isFetching}
          userNameByServer={data?.userName}
          cellNameByServer={data?.cellName}
          goBack={() => router.back()}
        />
      </BlockContainer>
      <BlockContainer>
        <div className='max-w-xl mx-auto'>
          <UserDallantStatistic 
            isLoading={isLoading}
            isFetching={isFetching}
            data={data}
          />
        </div>
      </BlockContainer>
      <BlockContainer>
        <div className='max-w-xl mx-auto'>
          <UserDallantHistory 
            isLoading={isLoading}
            isFetching={isFetching}
            data={data}
          />
        </div>
      </BlockContainer>
    </>
  );
};

export default UserDallant;
