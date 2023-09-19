import React from 'react';
import { CombinedCellDallantType } from '../../../../interface/Dallants';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';

interface CellDallantDetailTotalProps {
  isLoading: boolean;
  cellDallant: CombinedCellDallantType | null | undefined
}

const CellDallantDetailTotal = ({ isLoading, cellDallant }: CellDallantDetailTotalProps) => {
  return (
    <>
      {isLoading ? (
          <div className="animate-pulse flex flex-col items-center space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
            <div className="h-1.5 w-1/12 bg-slate-200 rounded justify-items-end"></div>
            <div className="h-3 w-1/6 bg-slate-200 rounded"></div>
          </div>
        ) : (
          <div>
            {cellDallant ? (
              <div className='text-center'>
                <h2 className='text-lg font-medium text-gray-900'>{cellDallant.name} 달란트 총액</h2>
                <p className='text-5xl font-bold text-gray-900 py-3'>{Number(cellDallant.totalAmount || 0).toLocaleString('kr-KR')} D</p>
              </div>
            ) : (
              <EmptyStateSimple />
            )}
          </div>
        )}
    </>
  );
};

export default CellDallantDetailTotal;
