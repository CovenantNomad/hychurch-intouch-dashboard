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
            <dl className='px-5 pt-3 pb-2 border border-[#dcdee0] rounded-xl'>
              <div className="w-full flex py-4">
                <dt className="text-base font-medium leading-6">총 달란트</dt>
                <dd className="text-base font-medium leading-6 ml-auto">{data.totalAmount.toLocaleString('kr-KR')} D</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">적립 횟수</dt>
                <dd className="text-sm ml-auto">{data.history.length} 회</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">1회 최대 적립금</dt>
                <dd className="text-sm ml-auto">{maxDallant.toLocaleString('kr-KR')} D</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">마지막 적립일</dt>
                <dd className="text-sm ml-auto">{recentDate}</dd>
              </div>
            </dl>
          ) : (
            <dl className='px-5 pt-3 pb-2 border border-[#dcdee0] rounded-xl'>
              <div className="w-full flex py-4">
                <dt className="text-base font-medium leading-6">총 달란트</dt>
                <dd className="text-base font-medium leading-6 ml-auto">0 D</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">적립 횟수</dt>
                <dd className="text-sm ml-auto">0 회</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">1회 최대 적립금</dt>
                <dd className="text-sm ml-auto">0 D</dd>
              </div>
              <div className="w-full flex py-3">
                <dt className="text-sm">마지막 적립일</dt>
                <dd className="text-sm ml-auto">0000-00-00</dd>
              </div>
            </dl>
          )}
        </>
      )}
    </>
  );
};

export default UserDallantStatistic;
