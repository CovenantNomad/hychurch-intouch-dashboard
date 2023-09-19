import React, { useState } from 'react';
import { DallantHistoryType, UserDallantType } from '../../../../interface/Dallants';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import Pagination from '../../../Blocks/Pagination/Pagination';

interface UserDallantHistoryProps {
  isLoading: boolean;
  isFetching: boolean;
  data: UserDallantType | null | undefined
}

const historySortFunc = (a: DallantHistoryType, b: DallantHistoryType) => {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);
  return dateB.getTime() - dateA.getTime();
}

const UserDallantHistory = ({ isLoading, isFetching, data }: UserDallantHistoryProps) => {
  const [ pageSize, setPageSize ] = useState(10)
  const [ currentPage, setCurrentPage ] = useState(1)
  const offset = (currentPage - 1) * pageSize

  return (
    <>
      <h3 className="text-2xl font-medium mb-8">적립내역</h3>
      <div className='flex gap-x-8 pb-2 mb-4 '>
        <div className='w-[24px]'></div>
        <div className='flex-1 text-gray-500'>내역</div>
        <div className='flex-1 text-gray-500'>날짜</div>
        <div className='flex-[2] pr-4 text-right text-gray-500'>적립</div>
        <div className='flex-[2] pr-4 text-right text-gray-500'>총액</div>
      </div>
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
              <ul role="list" className="space-y-6 pt-4 pb-8">
                {data.history.sort((a, b) => historySortFunc(a, b)).slice(offset, offset + pageSize).map((transaction, index) => (
                  <li key={transaction.docId} className="relative flex gap-x-8 py-1">
                    <div
                      className={`${(index === (data.history.length <= pageSize ? data.history.length - 1: pageSize - 1)) ? 'h-6 absolute left-0 top-0 flex w-6 justify-center' : '-bottom-6 absolute left-0 top-0 flex w-6 justify-center'}`}
                    >
                      <div className={`w-px bg-gray-300`} />
                    </div>
                    <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                    </div>
                    <p className="flex-1 text-base leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">{transaction.description}</span>
                    </p>
                    <p className="flex-1 text-sm leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">{transaction.createdAt}</span>
                    </p>
                    <p className="flex-[2] pr-4 text-base leading-5 text-gray-900 text-right">
                      {transaction.amount} D
                    </p>
                    <p className="flex-[2] pr-4 text-base leading-5 text-gray-900 text-right">
                      {data.history.slice(0, index + 1).reduce((sum, item) => sum + item.amount, 0)} D
                    </p>
                  </li>
                ))}
              </ul>
              <Pagination 
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={data.history.length}
              />
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
