import React from 'react';
import BlockCardContainer from '../../../Atoms/Container/BlockCardContainer';
import CellDayOrderCommunitySection from '../../../Organisms/Dallant/CellDayOrderCommunitySection/CellDayOrderCommunitySection';
import BlockContainer from '../../../Atoms/Container/BlockContainer';

interface CellDayOrderProps {}

const CellDayOrder = ({}: CellDayOrderProps) => {
  return (
    <div>
      <BlockContainer firstBlock>
        <h2 className='text-lg'>셀별 주문현황</h2>
      </BlockContainer>
      <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2 ">
        <BlockCardContainer>
          <CellDayOrderCommunitySection 
            communityName="길"
          />
        </BlockCardContainer>
        <BlockCardContainer>
          <CellDayOrderCommunitySection 
            communityName="진리"
          />
        </BlockCardContainer>
        <BlockCardContainer>
          <CellDayOrderCommunitySection 
            communityName="생명"
          />
        </BlockCardContainer>
        <BlockCardContainer>
          <CellDayOrderCommunitySection 
            communityName="빛"
          />
        </BlockCardContainer>
      </div>
      <BlockContainer>
        <h2 className='text-lg'>메뉴별 주문수량</h2>
      </BlockContainer>
    </div>
  );
};

export default CellDayOrder;
