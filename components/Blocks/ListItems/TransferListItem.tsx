import React, { Dispatch, SetStateAction } from 'react';
import { TransferInfo } from '../../../interface/cell';

interface TransferListItemProps {
  id: number,
  name: string,
  from: string,
  to: string,
  transferList: TransferInfo[]
  setTransferList: Dispatch<SetStateAction<TransferInfo[]>>
}

const TransferListItem = ({ id, name, from, to, transferList, setTransferList }: TransferListItemProps) => {

  const onRemoveHandler = (id: number) => {
    console.log(id)
    setTransferList(transferList.filter(list => list.id !== id))
  }

  return (
    <>
      <div className='col-span-5 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{name}</p>
      </div>
      <div className='col-span-3 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{from}</p>
      </div>
      <div className='col-span-3 border rounded-md py-2 px-4 flex items-center'>
        <p className='text-lg'>{to}</p>
      </div>
      <div className='col-span-1 flex justify-center'>
        <button 
          onClick={() => onRemoveHandler(id)}
          className='py-2 text-base text-white bg-red-500 w-full'>
            제거
        </button>
      </div>
    </>
  );
};

export default TransferListItem;
