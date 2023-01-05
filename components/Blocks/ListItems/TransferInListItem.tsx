import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { transferedUser } from '../../../interface/cell';

interface TransferInListItemProps {
  data: transferedUser
}

const TransferInListItem = ({ data }: TransferInListItemProps) => {
  return (
    <div className='bg-white flex justify-between items-center py-6 px-8 rounded-lg shadow-md border'>
      <div className='flex items-center'>
        <FaAngleDoubleRight size={34}  className="mr-6" />
        <div>
          <h4 className='text-2xl font-bold cursor-pointer'>{data.user.name}</h4>
          <span className='inline-block text-gray-500 text-lg mt-1'>{data.user.gender === "MAN" ? "형제" : "자매"}</span>
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <span className='inline-block text-gray-500 text-lg'>이동현황</span>
        <p className='text-lg mt-2'>
          <span>{data.fromCell.name}</span>
          <span className='inline-block px-2'>→</span>
          <span>{data.toCell.name}</span>
        </p>
      </div>
      <div className='flex flex-col justify-start'>
        <span className='inline-block text-gray-500 text-lg'>요청일</span>
        <p className='text-lg mt-2'>{data.orderDate}</p>
      </div>
      <div className='flex gap-3'>
        <button className='border border-blue-600 text-black px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white'>거절</button>
        <button className='border border-blue-600 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'>승인</button>
      </div>
    </div>
  );
};

export default TransferInListItem;
