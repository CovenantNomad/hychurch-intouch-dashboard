import React, { useState } from 'react';
import { CheckIcon, CloudArrowDownIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { getOrderById } from '../../../../../firebase/Dallant/CellDay';
import { OrderStatus } from '../../../../../interface/Dallants';
import CellOrderStatementModal from '../../../Modals/CellOrderStatementModal';

interface OrderStateListItemProps {
  cellId: string;
  cellName: string;
}



const OrderStateListItem = ({ cellId, cellName }: OrderStateListItemProps) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const { isLoading, isFetching, data } = useQuery(
    ['getOrderById', cellId], 
    () => getOrderById(cellId), 
    {
      enabled: !!cellId, 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000 
    }
  )

  return (
    <div
      onClick={() => setIsOpen(true)} 
      className={`
        ${!data ? 'bg-gray-100': data.orderStatus === OrderStatus.COMPLETE ? 'bg-teal-50' : ' bg-rose-50'}
        flex justify-between items-center px-4 py-5 shadow-sm rounded-md cursor-pointer
      `}
    >
      <p className='text-black'>{cellName}</p>
      {isLoading || isFetching ? (
        <div className='animate-pulse'>
          <CloudArrowDownIcon className='h-6 w-6 text-gray-500'/>
        </div>
      ) : (
        <>
          {data ? (
            <div className={`flex justify-center items-center p-1 border ${data.orderStatus === OrderStatus.COMPLETE ? 'border-teal-700': 'border-rose-700'} rounded-full`}>
              {data.orderStatus === OrderStatus.COMPLETE ? (
                <CheckIcon className='h-6 w-6 text-teal-700'/>
              ) : (
                <XMarkIcon className='h-6 w-6 text-rose-700'/>
              )}
            </div>
          ):(
            <div className={`flex flex-col justify-center items-center`}>
              <ExclamationTriangleIcon className='h-6 w-6 text-rose-700'/>
              <span className='text-xs text-gray-500'>데이터 없음!</span>
            </div>
          )}
        </>
      )}
      <CellOrderStatementModal 
        data={data}
        open={isOpen}
        setOpen={setIsOpen}
      />
    </div>
  );
};

export default OrderStateListItem;
