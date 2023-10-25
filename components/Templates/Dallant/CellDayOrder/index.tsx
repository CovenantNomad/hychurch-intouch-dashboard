import React from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import CellDayOrderStatement from '../../../Organisms/Dallant/CellDayOrderStatement';
import CellDayOrderStockSection from '../../../Organisms/Dallant/CellDayOrderStockSection';

interface CellDayOrderProps {}

const CellDayOrder = ({}: CellDayOrderProps) => {

  return (
    <div>
      <BlockContainer firstBlock>
        <h3 className='text-lg'>셀별 주문현황</h3>
      </BlockContainer>
      <CellDayOrderStatement />
      <BlockContainer>
        <h3 className='text-lg mb-4'>메뉴별 주문현황</h3>
        <CellDayOrderStockSection />
      </BlockContainer>
    </div>
  );
};

export default CellDayOrder;
