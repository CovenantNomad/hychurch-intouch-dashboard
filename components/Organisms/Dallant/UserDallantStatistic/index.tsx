import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserDallantType } from '../../../../interface/Dallants';

interface UserDallantStatisticProps {
  isLoading: boolean;
  isFetching: boolean;
  data: UserDallantType | null | undefined
}

const UserDallantStatistic = ({ isLoading, isFetching, data }: UserDallantStatisticProps) => {
  const [ recentDate, setRecentDate ] = useState("0000-00-00")
  const [ maxDallant, setMaxDallant ] = useState(0)

  useEffect(() => {
    if (!isLoading && !isFetching) {

      const calculateUserStatics = async () => {
        try {
          if (data) {
            const recentDate = data.history.reduce((maxDate, currentDate) => {
              return currentDate.createdAt > maxDate ? currentDate.createdAt : maxDate;
            }, data.history[0].createdAt);

            setRecentDate(recentDate)
          
            const maxDallant = data.history.reduce((maxDallant, currentDate) => {
              return currentDate.amount > maxDallant ? currentDate.amount : maxDallant;
            }, data.history[0].amount);

            setMaxDallant(maxDallant)
          }

        } catch (error) {
          console.error("@loadCellDallant Error: ", error);
          toast.error(`데이터 생성 중 에러가 발생했습니다.`)
        }
      }

      calculateUserStatics()
    }
  }, [isLoading, isFetching, data])

  return (
    <>
      {isLoading && isFetching ? (
        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse flex justify-between py-6 px-10 bg-[#F7F7F7]">
              <div className="h-1.5 w-1/4 bg-slate-200 rounded"></div>
              <div className="h-1.5 w-1/3 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {data ? (
            <dl className='divide-y divide-white/40 bg-black'>
              <div className="w-full grid grid-cols-2 px-4 py-6">
                <dt className="text-base font-medium leading-6 text-white col-span-1">총 달란트</dt>
                <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{data.totalAmount.toLocaleString('kr-KR')} D</dd>
              </div>
              <div className="w-full grid grid-cols-2 px-4 py-6">
                <dt className="text-base font-medium leading-6 text-white">적립 횟수</dt>
                <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">{data.history.length} 회</dd>
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
          ) : (
            <dl className='divide-y divide-white/40 bg-black'>
              <div className="w-full grid grid-cols-2 px-4 py-6">
                <dt className="text-base font-medium leading-6 text-white col-span-1">총 달란트</dt>
                <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">0 D</dd>
              </div>
              <div className="w-full grid grid-cols-2 px-4 py-6">
                <dt className="text-base font-medium leading-6 text-white">적립 횟수</dt>
                <dd className="text-base font-medium leading-6 text-gray-400 text-right pr-8">0 회</dd>
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
          )}
        </>
      )}
    </>
  );
};

export default UserDallantStatistic;
