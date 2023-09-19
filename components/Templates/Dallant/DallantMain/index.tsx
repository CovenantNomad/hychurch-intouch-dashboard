import React from 'react';
//components
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import DallantTotalSection from '../../../Organisms/Dallant/DallantTotalSection';
import CellDallantSection from '../../../Organisms/Dallant/CellDallantSection';
import DallantStaticSection from '../../../Organisms/Dallant/DallantStaticSection';
import OthersDallantSection from '../../../Organisms/Dallant/OthersDallantSection';

interface DallantMainProps {}

const DallantMain = ({}: DallantMainProps) => {
  
  return (
    <>
      <BlockContainer firstBlock>
        <DallantTotalSection />
      </BlockContainer>
      <BlockContainer>
        <DallantStaticSection />
      </BlockContainer> 
      <BlockContainer>
        <CellDallantSection />
      </BlockContainer>
      <BlockContainer>
        <OthersDallantSection />
      </BlockContainer>
    </>
  );
};

export default DallantMain;
