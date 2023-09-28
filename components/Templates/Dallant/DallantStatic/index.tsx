import React from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import DallantStaticHeader from '../../../Organisms/Dallant/Static/DallantStaticHeader/DallantStaticHeader';
import DallantStaticCell from '../../../Organisms/Dallant/Static/DallantStaticCell/DallantStaticCell';
// import DallantStaticIndividual from '../../../Organisms/Dallant/Static/DallantStaticIndividual/DallantStaticIndividual';

interface DallantStaticProps {}

const DallantStatic = ({}: DallantStaticProps) => {
  return (
    <>
       <BlockContainer firstBlock>
          <DallantStaticHeader />
       </BlockContainer>
       <BlockContainer>
          <DallantStaticCell />
       </BlockContainer>
       {/* <BlockContainer>
          <DallantStaticIndividual />
       </BlockContainer> */}
    </>
  );
};

export default DallantStatic;
