import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getCellStatics, getIndividualStatics } from '../../../../firebase/Dallant/Dallant';
import Spinner from '../../../Atoms/Spinner';
import Pagination from '../../../Blocks/Pagination/Pagination';
import SimpleStatOnDark from '../../../Atoms/Stats/SimpleStatOnDark';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';

interface DallantStaticSectionProps {}

const DallantStaticSection = ({}: DallantStaticSectionProps) => {
  // pagination state
  const [ pageSize, setPageSize ] = useState(5)
  const [ currentPage, setCurrentPage ] = useState(1)
  const offset = (currentPage - 1) * pageSize

  const { isLoading, data } = useQuery(
    'getOverallStatics', 
    getIndividualStatics, 
    { 
      staleTime: 3 * 60 * 1000, 
      cacheTime: 3 * 60 * 1000 
    }
  )

  const { isLoading: isCellLoading, data: cellStatic } = useQuery(
    'getCellStatics', 
    getCellStatics, 
    { 
      staleTime: 3 * 60 * 1000, 
      cacheTime: 3 * 60 * 1000 
    }
  )

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=''>
          <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>달란트 통계 현황</h2>
          {data && cellStatic ? (
            <div className='grid grid-cols-6 gap-x-8'>
              <div className='col-span-4'>
                <div className='grid grid-cols-3 gap-8'>
                  <SimpleStatOnDark 
                    title='1인당 평균 달란트'
                    value={data.averageDallantsByIndividual.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='개인 최저 달란트 보유량'
                    value={data.minDallantsByIndividual.toLocaleString('kr-KR')}
                    unit='D'
                  />
                  <SimpleStatOnDark 
                    title='개인 최고 달란트 보유량'
                    value={data.maxDallantsByIndividual.toLocaleString('kr-KR')}
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
                <div className='divide-y divide-gray-100 overflow-hidden bg-white shadow-sm rounded-xl'>
                  <div className="border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-4">
                    <h3 className='text-lg font-semibold leading-6 text-gray-900'>달란트 보유 Top 20</h3>
                  </div>
                  {data?.top20Individuals.slice(offset, offset + pageSize).map((people, index) => (
                    <div key={people.userId} className='flex items-center justify-between px-4 py-5 hover:bg-gray-50'>
                      <div className='flex items-center gap-x-6'>
                        <p className='text-sm'>{offset + index + 1}</p>
                        <p className='text-base font-medium'>{people.userName}</p>
                      </div>
                      <p className='font-medium'>{people.dallants.toLocaleString('kr-KR')} D</p>
                    </div>
                  ))}
                </div>
                <Pagination 
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalCount={data!.top20Individuals.length}
                />
              </div>
            </div>
          ) : (
            <div>
              <EmptyStateSimple />
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default DallantStaticSection;
