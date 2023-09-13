import React from 'react';
import { DallantHistoryType } from '../../../../interface/Dallants';

interface UserDallantHistoryProps {
  history: DallantHistoryType[]
}

const UserDallantHistory = ({ history }: UserDallantHistoryProps) => {
  return (
    <>
      <div className='flex gap-x-8 pb-2 mb-4 '>
        <div className='w-[24px]'></div>
        <div className='flex-1 text-gray-500'>내역</div>
        <div className='flex-1 text-gray-500'>날짜</div>
        <div className='flex-[2] pr-4 text-right text-gray-500'>적립</div>
        <div className='flex-[2] pr-4 text-right text-gray-500'>총액</div>
      </div>
      <ul role="list" className="space-y-6">
        {history.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
          }).map((transaction, index) => (
          <li key={transaction.docId} className="relative flex gap-x-8 py-1">
            <div
              className={`${index === history.length - 1 ? 'h-6 absolute left-0 top-0 flex w-6 justify-center' : '-bottom-6 absolute left-0 top-0 flex w-6 justify-center'}`}
            >
              <div className="w-px bg-gray-200" />
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
              {history.slice(0, index + 1).reduce((sum, item) => sum + item.amount, 0)} D
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDallantHistory;
