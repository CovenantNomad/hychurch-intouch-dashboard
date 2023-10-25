import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getOrderStock } from '../../../../firebase/Dallant/CellDay';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface CellDayOrderStockSectionProps {}

const CellDayOrderStockSection = ({}: CellDayOrderStockSectionProps) => {
  const { isLoading, isFetching, data } = useQuery(
    ['getOrderStock'], 
    getOrderStock, 
    {
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000 
    }
  )

  return (
    <div>
      {isLoading || isFetching ? (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
        </div>
      ) : (
        <div>
          {data ? (
            <>
              {data.map(item => (
                <div
                  key={item.menuId}
                  className="flex justify-between items-center py-4 px-4 border border-gray-300 rounded-md"
                >
                  <span className="block font-bold">
                    {item.menuName}
                  </span>
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm">주문수량 : </span>
                    <span className="text-lg font-bold">{item.orderUnits}개</span>
                  </div>
                </div>
              ))}
            </>
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

export default CellDayOrderStockSection;
