import React from 'react';
import { useQuery } from 'react-query';
import { getOrders } from '../../../../firebase/Dallant/CellDay';
import useCommunity from '../../../../hooks/useCommunity';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import BlockCardContainer from '../../../Atoms/Container/BlockCardContainer';
import CellDayOrderCommunitySection from '../CellDayOrderCommunitySection';

interface CellDayOrderStatementProps {}

const CellDayOrderStatement = ({}: CellDayOrderStatementProps) => {
  const { isLoading: isInitialLoading, data: community } = useCommunity()  

  return (
    <div>
      {isInitialLoading ? (
        <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2">
          <div className={`animate-pulse w-full h-20 mt-2 rounded-md bg-white border border-gray-200 shadow-sm lg:px-5`} />
          <div className={`animate-pulse w-full h-20 mt-2 rounded-md bg-white border border-gray-200 shadow-sm lg:px-5`} />
          <div className={`animate-pulse w-full h-20 mt-2 rounded-md bg-white border border-gray-200 shadow-sm lg:px-5`} />
          <div className={`animate-pulse w-full h-20 mt-2 rounded-md bg-white border border-gray-200 shadow-sm lg:px-5`} />
        </div>
      ) : (
        <div>
          {community ? (
            <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2">
              <BlockCardContainer>
                <CellDayOrderCommunitySection 
                  community={community.filter(item => item.id === '0')[0]}
                />
              </BlockCardContainer>
              <BlockCardContainer>
                <CellDayOrderCommunitySection 
                  community={community.filter(item => item.id === '1')[0]}
                />
              </BlockCardContainer>
              <BlockCardContainer>
                <CellDayOrderCommunitySection 
                  community={community.filter(item => item.id === '2')[0]}
                />
              </BlockCardContainer>
              <BlockCardContainer>
                <CellDayOrderCommunitySection 
                  community={community.filter(item => item.id === '3')[0]}
                />
              </BlockCardContainer>
            </div>
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

export default CellDayOrderStatement;
