import React from 'react';
//types
import { DallantsSettingType } from '../../../../interface/Dallants';
//components
import Spinner from '../../../Atoms/Spinner';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import SeasonOffSection from '../../../Organisms/Dallant/SeasonOffSection';
import DallantTotalSection from '../../../Organisms/Dallant/DallantTotalSection';
import CellDallantSection from '../../../Organisms/Dallant/CellDallantSection';
import DallantStaticSection from '../../../Organisms/Dallant/DallantStaticSection';

interface DallantMainProps {
  initialSetting: DallantsSettingType | undefined
  isSettingLoading: boolean;
}

const DallantMain = ({ isSettingLoading, initialSetting }: DallantMainProps) => {
  
  return (
    <>
      {!initialSetting?.isActivity ? (
        <BlockContainer firstBlock>
          {isSettingLoading ? (
            <Spinner />
          ) : (
            <SeasonOffSection />
          )}
        </BlockContainer>
      ) : (
        <>
          <BlockContainer firstBlock>
            {isSettingLoading ? (
              <Spinner />
            ) : (
              <DallantTotalSection />
            )}
          </BlockContainer>
          <BlockContainer>
            <DallantStaticSection />
          </BlockContainer> 
          <BlockContainer>
            <CellDallantSection />
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default DallantMain;
