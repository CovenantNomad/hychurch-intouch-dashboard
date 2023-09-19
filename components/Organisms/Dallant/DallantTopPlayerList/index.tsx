import React, { useState } from 'react';
import Pagination from '../../../Blocks/Pagination/Pagination';
import { OverallStaticDataType } from '../../../../interface/Dallants';

interface DallantTopPlayerListProps {
  data: OverallStaticDataType;
}

const DallantTopPlayerList = ({ data }: DallantTopPlayerListProps) => {
  const [ pageSize, setPageSize ] = useState(5)
  const [ currentPage, setCurrentPage ] = useState(1)
  const offset = (currentPage - 1) * pageSize

  return (
    <>
      <div className='divide-y divide-gray-100 overflow-hidden bg-white shadow-sm rounded-xl'>
        <div className="border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-4">
          <h3 className='text-lg font-semibold leading-6 text-gray-900'>달란트 보유 Top 20</h3>
        </div>
        {data.top20Individuals.slice(offset, offset + pageSize).map((people, index) => (
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
    </>
  );
};

export default DallantTopPlayerList;
