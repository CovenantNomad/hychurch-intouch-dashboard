import React from 'react';
//hooks
import useCellDallants from '../../../../hooks/useCellDallants';
//type
import { CommunityFilter } from '../../../../stores/cellState';
//components
import CellDallantList from '../CellDallantList';
import CellDallantListItem from '../CellDallantListItem';
import Spinner from '../../../Atoms/Spinner';


interface CellDallantSectionProps {}

const CellDallantSection = ({}: CellDallantSectionProps) => {
  const { isLoading, cellDallants } = useCellDallants()

  return (
    <div>
      <div>
        <h2 className='text-lg font-medium leading-6 text-gray-900'>셀별 달란트 현황</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {cellDallants && (
              <div className='grid grid-cols-4 gap-x-4 mt-4'>
                <CellDallantList cellName='빛' bgColor='bg-[#FF808B]/30' titleColor='text-rose-500'>
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
                <CellDallantList cellName='길' bgColor='bg-orange-100/80' titleColor='text-orange-500'>
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
                <CellDallantList cellName='진리' bgColor='bg-amber-100/80' titleColor='text-amber-500'>
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
                <CellDallantList cellName='생명' bgColor='bg-teal-100/80' titleColor='text-teal-500'>
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
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDallantSection;
