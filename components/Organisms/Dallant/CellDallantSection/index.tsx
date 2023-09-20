import React from 'react';
//hooks
import useCellDallants from '../../../../hooks/useCellDallants';
//type
import { CommunityFilter } from '../../../../stores/cellState';
//components
import CellDallantList from '../CellDallantList';
import CellDallantListItem from '../CellDallantListItem';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';


interface CellDallantSectionProps {}

const CellDallantSection = ({}: CellDallantSectionProps) => {
  const { isLoading, cellDallants } = useCellDallants()


  return (
    <div>
      <div>
        <h2 className='text-lg font-medium leading-6 text-gray-900'>셀별 달란트 현황</h2>
        {isLoading ? (
          <div className='grid grid-cols-4 gap-x-4 mt-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
                <div className="h-[8px] w-1/2 bg-slate-200 rounded justify-items-end"></div>
                <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
                <div className="h-[6px] w-1/3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {cellDallants ? (
              <div className='grid grid-cols-4 gap-x-4 mt-4'>
                <CellDallantList cellName='길' bgColor='bg-[#FF808B]/30' titleColor='text-rose-500'>
                  {cellDallants
                    .filter(item => item.community === CommunityFilter.WAY)
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      else if (b.name > a.name) return -1;
                      else return 0;
                    }).map((item) => (
                      <CellDallantListItem 
                        key={item.id} 
                        cellId={item.id} 
                        cellName={item.name} 
                        participants={item.participants} 
                        totalAmount={item.totalAmount}
                      />
                    ))}
                </CellDallantList>
                <CellDallantList cellName='진리' bgColor='bg-orange-100/80' titleColor='text-orange-500'>
                  {cellDallants
                    .filter(item => item.community === CommunityFilter.TRUTH)
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      else if (b.name > a.name) return -1;
                      else return 0;
                    }).map((item) => (
                      <CellDallantListItem 
                        key={item.id} 
                        cellId={item.id} 
                        cellName={item.name} 
                        participants={item.participants} 
                        totalAmount={item.totalAmount}
                      />
                    ))}
                </CellDallantList>
                <CellDallantList cellName='생명' bgColor='bg-amber-100/80' titleColor='text-amber-500'>
                  {cellDallants
                    .filter(item => item.community === CommunityFilter.LIFE)
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      else if (b.name > a.name) return -1;
                      else return 0;
                    }).map((item) => (
                      <CellDallantListItem 
                        key={item.id} 
                        cellId={item.id} 
                        cellName={item.name} 
                        participants={item.participants} 
                        totalAmount={item.totalAmount}
                      />
                    ))}
                </CellDallantList>
                <CellDallantList cellName='빛' bgColor='bg-teal-100/80' titleColor='text-teal-500'>
                  {cellDallants
                    .filter(item => item.community === CommunityFilter.LIGHT)
                    .sort((a, b) => {
                      if (a.name > b.name) return 1;
                      else if (b.name > a.name) return -1;
                      else return 0;
                    }).map((item) => (
                      <CellDallantListItem 
                        key={item.id} 
                        cellId={item.id} 
                        cellName={item.name} 
                        participants={item.participants} 
                        totalAmount={item.totalAmount}
                      />
                    ))}
                </CellDallantList>
              </div>
            ) : (
              <div className='py-8'>
                <EmptyStateSimple />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDallantSection;
