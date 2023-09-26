import React, { useEffect, useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import { useRouter } from 'next/router';
import { convertSecondToDate } from '../../../../utils/dateUtils';
import { useQuery } from 'react-query';
import { getUserHistory } from '../../../../firebase/Dallant/Dallant';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import UserDallantHistoryDetail from '../../../Organisms/Dallant/UserDallantHistoryDetail';


interface DallantHistoryDetailProps {}

const DallantHistoryDetail = ({}: DallantHistoryDetailProps) => {
  const [ queryCellId, setQueryCellId ] = useState<string>("")
  const [ queryUserId, setQueryUserId ] = useState<string>("")
  const [ queryDocId, setQueryDocId ] = useState<string>("")
  const router = useRouter()
  const { amount, totalAmount, description, createdTimestamp } = router.query

  const { isLoading, isFetching, data } = useQuery(
    ['getUserHistory', queryUserId, queryDocId], 
    () => getUserHistory(queryUserId, queryDocId),
    {
      enabled: Boolean(queryUserId !== "") && Boolean(queryUserId !== ""),
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (router.query.userId) {
      if (typeof router.query.userId === 'string'){
        setQueryUserId(router.query.userId)
      } else if (Array.isArray(router.query.userId)) {
        setQueryUserId(router.query.userId[0])
      } else {
        setQueryUserId("")
      }
    }

    if (router.query.docId) {
      if (typeof router.query.docId === 'string'){
        setQueryDocId(router.query.docId)
      } else if (Array.isArray(router.query.docId)) {
        setQueryDocId(router.query.docId[0])
      } else {
        setQueryDocId("")
      }
    }

    if (router.query.id) {
      if (typeof router.query.id === 'string'){
        setQueryCellId(router.query.id)
      } else if (Array.isArray(router.query.id)) {
        setQueryCellId(router.query.id[0])
      } else {
        setQueryCellId("")
      }
    }
  }, [])

  if (amount && totalAmount && description && createdTimestamp) {
    return (
      <BlockContainer firstBlock>
        <UserDallantHistoryDetail 
          description={String(description)}
          createdAt={createdTimestamp}
          amount={String(amount)}
          totalAmount={String(totalAmount)}
          cellId={queryCellId}
          userId={queryUserId}
          docId={queryDocId}
          goBack={() => router.back()}
        />
      </BlockContainer>
    )
  }

  return (
    <>
      <BlockContainer firstBlock>
        {isLoading || isFetching ? (
          <div className="animate-pulse max-w-xl px-8 pt-16 pb-12 my-8 space-y-8 mx-auto border border-gray-300 shadow-sm">
            <div className="h-3 w-1/4 bg-slate-200 rounded mb-16"></div>
            <div className='flex justify-between'>
              <div className="h-1 w-1/6 bg-slate-200 rounded"></div>
              <div className="h-1 w-1/3 bg-slate-200 rounded"></div>
            </div>
            <div className='flex justify-between'>
              <div className="h-1 w-1/6 bg-slate-200 rounded"></div>
              <div className="h-1 w-1/3 bg-slate-200 rounded"></div>
            </div>
            <div className='flex justify-between'>
              <div className="h-1 w-1/6 bg-slate-200 rounded"></div>
              <div className="h-1 w-1/3 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            {data ? (
              <UserDallantHistoryDetail 
                description={data.description}
                createdAt={data.createdTimestamp.seconds}
                amount={String(data.amount)}
                totalAmount={String(data.totalAmount)}
                cellId={queryCellId}
                userId={queryUserId}
                docId={queryDocId}
                goBack={() => router.back()}
              />
            ) : (
              <div className='max-w-xl px-8 pt-16 pb-12 my-8 mx-auto border border-gray-300 shadow-sm'>
                <EmptyStateSimple />
              </div>
            )}
          </>
        )}
      </BlockContainer>
    </>
  );
};

export default DallantHistoryDetail;
