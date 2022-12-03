import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiDotsVertical } from "react-icons/hi";
import TransferListItem from '../../ListItems/TransferListItem';

interface TransferProcessProps {}

const transferCell = [
  {
    id: 1,
    name: '김바울',
    from: '남정훈셀',
    to: '조준원셀',
    date: '2022.11.10',
  },
  {
    id: 2,
    name: '김요셉',
    from: '남정훈셀',
    to: '김파비오셀',
    date: '2022.11.10',
  }
]

const TransferProcess = ({}: TransferProcessProps) => {
  const [ transerCell, setTransferCell ] = useState<string>("셀 미지정")
  const { handleSubmit, register, } = useForm()

  return (
    <div className='px-6 pt-8 py-32 bg-white'>
      <h3 className='text-[32px] pb-6'>Create New Transfer</h3>
      <div className='w-full h-[1px] bg-gray-600'></div>
      <div className='mt-8'>
        <h4 className='text-xl font-bold mb-6'>이동 할 셀원</h4>
        <div className='grid grid-cols-12 gap-x-4 text-gray-500 mb-2'>
          <p className='col-span-5'>Name</p>
          <p className='col-span-2'>From</p>
          <p className='col-span-2'>To</p>
          <p className='col-span-2'>Issued On</p>
        </div>
        <div className='grid grid-cols-12 gap-x-4 gap-y-3'>
          {transferCell.map(item => 
            <TransferListItem key={item.id} name={item.name} to={item.to} from={item.from} date={item.date} />
          )}
        </div>
        <div className='mt-6'>
          <button>
            <span className='text-blue-600 font-bold'>+ 이동 할 셀원 추가하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferProcess;
