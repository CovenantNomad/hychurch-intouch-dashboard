import React from 'react';

interface TransferHistoryProps {}

const TransferHistory = ({}: TransferHistoryProps) => {
  return (
    <div className='px-6 pt-8 py-32 bg-white'>
      <div className=''>
        <h3 className='text-[32px] font-poppins pb-6'>Transfer In</h3>
        <div className='w-full h-[1px] bg-gray-600'></div>
        <div className='mt-8 flex flex-col gap-6'>
          Table
        </div>
      </div>
      <div className='mt-32'>
        <h3 className='text-[32px] font-poppins pb-6'>Transfer Out</h3>
        <div className='w-full h-[1px] bg-gray-600'></div>
        <div className='mt-8 flex flex-col gap-6'>
          Table
        </div>
      </div>
    </div>
  );
};

export default TransferHistory;
