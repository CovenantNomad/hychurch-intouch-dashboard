import React, { useState } from 'react';
import { UserDallantType } from '../../../../interface/Dallants';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import Pagination from '../../../Blocks/Pagination/Pagination';
import { convertSecondToDate } from '../../../../utils/dateUtils';
import Link from 'next/link';

interface UserDallantHistoryProps {
  isLoading: boolean;
  isFetching: boolean;
  data: UserDallantType | null | undefined
}

const UserDallantHistory = ({ isLoading, isFetching, data }: UserDallantHistoryProps) => {
  const [ pageSize, setPageSize ] = useState(10)
  const [ currentPage, setCurrentPage ] = useState(1)
  const offset = (currentPage - 1) * pageSize

  return (
    <>
      {isLoading && isFetching ? (
        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse flex justify-between py-6 space-x-8">
              <div className="h-2 w-1/4 bg-slate-200 rounded"></div>
              <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {data ? (
            <>
              <ul role="list" className="pt-4 pb-8 divide-y divide-[#dcdee0]">
                {data.history.sort((a, b) => Number(b.createdTimestamp) - Number(a.createdTimestamp)).slice(offset, offset + pageSize).map((transaction, index) => (
                  <Link
                    key={transaction.docId} 
                    href={{
                      pathname: `/dallant/${data.cellId}/members/${data.userId}/history/${transaction.docId}`,
                      query: { 
                        userId: data.userId, 
                        userName: data.userName, 
                        cellId: data.cellId, 
                        cellName: data.cellName,
                        amount: transaction.amount,
                        totalAmount: transaction.totalAmount,
                        description: transaction.description,
                        createdTimestamp: transaction.createdTimestamp.seconds,
                      },
                    }}
                    as={`/dallant/${data.cellId}/members/${data.userId}/history/${transaction.docId}`}
                  >
                    <li className='flex cursor-pointer'>
                      <div className='min-w-[52px] pt-5 text-sm'>
                        {transaction.createdAt.split('-')[1]}.{transaction.createdAt.split('-')[2]}
                      </div>
                      <div className='w-full pt-5 pb-5'>
                        <div className='flex justify-between item-center'>
                          <div>
                            {transaction.description}
                          </div>
                          <div>
                            <strong className='text-blue-500'>{transaction.totalAmount} D</strong>
                          </div>
                        </div>
                        <div className='flex justify-between items-center mt-[1px]'>
                          <div className='text-xs text-key-700'>
                            {convertSecondToDate(transaction.createdTimestamp.seconds).format('YYYY.MM.DD HH:mm:ss')}
                          </div>
                          <div>
                            <strong className='text-sm text-gray-500'>{transaction.amount} D 적립</strong>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
              <div className=''>
                <Pagination 
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalCount={data.history.length}
                />
              </div>
            </>
          ) : (
            <div className='py-8'>
              <EmptyStateSimple />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserDallantHistory;
