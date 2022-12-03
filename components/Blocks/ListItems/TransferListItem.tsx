import React from 'react';

interface TransferListItemProps {
  name: string,
  from: string,
  to: string,
  date: string,
}

const TransferListItem = ({ name, from, to, date}: TransferListItemProps) => {
  return (
    <>
      <div className='col-span-5 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{name}</p>
      </div>
      <div className='col-span-2 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{from}</p>
      </div>
      <div className='col-span-2 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{to}</p>
      </div>
      <div className='col-span-2 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{date}</p>
      </div>
      <div className='col-span-1 flex justify-center'>
        <button className='px-4 py-2 text-base text-white bg-red-500 min-[1920px]:'>제거</button>
      </div>
    </>
  );
};

export default TransferListItem;
