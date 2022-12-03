import React, { useState } from 'react';
import TransferConfirm from './Transfer/TransferConfirm';
import TransferHistory from './Transfer/TransferHistory';
import TransferProcess from './Transfer/TransferProcess';

interface CellTransferProps {}

const tabs = [
  { id: 0, component: <TransferProcess />},
  { id: 1, component: <TransferConfirm />},
  { id: 2, component: <TransferHistory />},
]

const CellTransferScreen = ({}: CellTransferProps) => {
  const [ selectedTab, setSelectedTab ] = useState(0)
  
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 pr-8'>
        <div 
          className='shadow-sm border border-[#e5e5e5] py-3 px-6 bg-white cursor-pointer'
          onClick={() => setSelectedTab(0)}
        >
          <span className='text-lg'>셀원 이동 신청하기</span>
        </div>
        <div 
          className='shadow-sm border border-[#e5e5e5] py-3 px-6 mt-4 bg-white cursor-pointer'
          onClick={() => setSelectedTab(1)}
        >
          <span className='text-lg'>셀원 이동 신청처리</span>
        </div>
        <div 
          className='shadow-sm border border-[#e5e5e5] py-3 px-6 mt-4 bg-white cursor-pointer'
          onClick={() => setSelectedTab(2)}
        >
          <span className='text-lg'>셀원 이동 이력관리</span>
        </div>
      </div>
      <div className='col-span-4 border border-[#e5e5e5]'>
        {tabs[selectedTab].component}
      </div>
    </div>
  );
};

export default CellTransferScreen;
