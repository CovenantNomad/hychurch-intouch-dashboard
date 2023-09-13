import React from 'react';
import { DallantHistoryType } from '../../../../interface/Dallants';

interface UserDallantStatisticProps {
  totalAmount: number;
  history: DallantHistoryType[]
}

const UserDallantStatistic = ({ totalAmount, history }: UserDallantStatisticProps) => {
  const recentDate = history.reduce((maxDate, currentDate) => {
    return currentDate.createdAt > maxDate ? currentDate.createdAt : maxDate;
  }, history[0].createdAt);

  const maxDallant = history.reduce((maxDallant, currentDate) => {
    return currentDate.amount > maxDallant ? currentDate.amount : maxDallant;
  }, history[0].amount);

  return (
    <dl className='divide-y divide-white/40'>
      <div className="w-full grid grid-cols-2 px-4 py-6">
        <dt className="text-base font-medium leading-6 text-white col-span-1">총 달란트</dt>
        <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{totalAmount.toLocaleString('kr-KR')} D</dd>
      </div>
      <div className="w-full grid grid-cols-2 px-4 py-6">
        <dt className="text-base font-medium leading-6 text-white">적립 횟수</dt>
        <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{history.length} 회</dd>
      </div>
      <div className="w-full grid grid-cols-2 px-4 py-6">
        <dt className="text-base font-medium leading-6 text-white">마지막 적립일</dt>
        <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{recentDate}</dd>
      </div>
      <div className="w-full grid grid-cols-2 px-4 py-6">
        <dt className="text-base font-medium leading-6 text-white">1회 최대 적립금</dt>
        <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{maxDallant.toLocaleString('kr-KR')} D</dd>
      </div>
    </dl>
  );
};

export default UserDallantStatistic;
