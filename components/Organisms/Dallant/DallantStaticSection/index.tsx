import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getCellStatics, getIndividualStatics } from '../../../../firebase/Dallant/Dallant';
import Spinner from '../../../Atoms/Spinner';
import Pagination from '../../../Blocks/Pagination/Pagination';
import SimpleStatOnDark from '../../../Atoms/Stats/SimpleStatOnDark';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';
import DallantTopPlayerList from '../DallantTopPlayerList';

interface DallantStaticSectionProps {}

const DallantStaticSection = ({}: DallantStaticSectionProps) => {
  // pagination state


  const { isLoading: isOverallStatic, isFetching: isOverallFetching, data: overallStatic } = useQuery(
    'getOverallStatics', 
    getIndividualStatics, 
    { 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 15 * 60 * 1000 
    }
  )

  const { isLoading: isCellLoading, isFetching: isCellFetching, data: cellStatic } = useQuery(
    'getCellStatics', 
    getCellStatics, 
    { 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 15 * 60 * 1000 
    }
  )

  return (
    <div>
      <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>달란트 통계 현황</h2>
      {(isOverallStatic || isCellLoading || isOverallFetching || isCellFetching) ? (
        <div className='grid grid-cols-6 gap-x-8'>
          <div className='col-span-4'>
            <div className='grid grid-cols-3 gap-8'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-6 py-10 px-10 rounded-xl bg-[#F7F7F7]">
                  <div className="h-1 w-1/3 bg-slate-200 rounded"></div>
                  <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className='col-span-2'>
            <div className='divide-y divide-gray-100 overflow-hidden bg-white shadow-sm rounded-xl'>
              <div className="border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-4">
                <h3 className='text-lg font-semibold leading-6 text-gray-900'>달란트 보유 Top 20</h3>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse flex justify-between py-6 px-10 rounded-xl bg-[#F7F7F7]">
                    <div className="h-1.5 w-1/4 bg-slate-200 rounded"></div>
                    <div className="h-1.5 w-1/3 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {overallStatic && cellStatic ? (
            <div className='grid grid-cols-6 gap-x-8'>
              <div className='col-span-4'>
                <div className='grid grid-cols-3 gap-8'>
                  <SimpleStatOnDark 
                    title='1인당 평균 달란트'
                    value={overallStatic.averageDallantsByIndividual.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='개인 최저 달란트 보유량'
                    value={overallStatic.minDallantsByIndividual.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='개인 최고 달란트 보유량'
                    value={overallStatic.maxDallantsByIndividual.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='셀 평균 달란트'
                    value={cellStatic.averageDallantsByCell.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='셀 최저 달란트 보유량'
                    value={cellStatic.minDallantsByCell.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='셀 최고 달란트 보유량'
                    value={cellStatic.maxDallantsByCell.toLocaleString('kr-KR')}
                    unit='D'
                  />
                </div>
                <div className='mt-12 text-right'>
                  <Link
                    href={{ pathname: `/dallant/dallant-statistic` }}
                  >
                    <p className='text-blue-600 font-medium hover:underline cursor-pointer'>더 많은 통계 보러가기</p>
                  </Link>
                </div>
              </div>
              <div className='col-span-2'>
                <DallantTopPlayerList data={overallStatic} />
              </div>
            </div>
          ) : (
            <div>
              <EmptyStateSimple />
            </div>
          )}
        </>
      )}
      
    </div>
  );
};

export default DallantStaticSection;
