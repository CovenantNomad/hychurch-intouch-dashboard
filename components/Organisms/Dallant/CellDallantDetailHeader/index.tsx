import React, { Dispatch, SetStateAction } from 'react';
import { CombinedCellDallantType } from '../../../../interface/Dallants';

interface CellDallantDetailHeaderProps {
  isLoading: boolean;
  cellDallant: CombinedCellDallantType | null | undefined
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CellDallantDetailHeader = ({ isLoading, cellDallant, open, setOpen }: CellDallantDetailHeaderProps) => {
  return (
    <>
      {isLoading ? (
          <div className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
            <div className="h-2 w-1/6 bg-slate-200 rounded justify-items-end"></div>
            <div className="h-1.5 w-1/12 bg-slate-200 rounded"></div>
          </div>
        ) : (
          <div>
            {cellDallant ? (
              <div className='flex justify-between items-center'>
                <div>
                  <h5 className="text-2xl font-medium">{cellDallant.name}</h5>
                  <p className="text-sm text-GRAY004">{cellDallant.community} 공동체</p>
                </div>
                <div>
                  <button onClick={() => setOpen(!open)}>
                    <p className='bg-blue-600 px-4 py-2 rounded-lg text-white cursor-pointer'>출력 페이지</p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-2xl font-medium">셀</h5>
                <p className="text-sm text-GRAY004">공동체</p>
              </div>
            )}
          </div>
        )}
    </>
  );
};

export default CellDallantDetailHeader;
