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
import OthersDallantSection from '../../../Organisms/Dallant/OthersDallantSection';

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
            <div className='py-8'>
              <Spinner />
            </div>
          ) : (
            <SeasonOffSection />
          )}
        </BlockContainer>
      ) : (
        <>
          <BlockContainer firstBlock>
            {isSettingLoading ? (
              <div className='py-8'>
                <Spinner />
              </div>
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
          <BlockContainer>
            <OthersDallantSection />
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default DallantMain;
