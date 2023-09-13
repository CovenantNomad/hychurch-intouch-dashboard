import React from 'react';
import Spinner from '../../../Atoms/Spinner';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import SimpleAlerts from '../../../Atoms/Alerts/SimpleAlerts';
import TerminateSeason from '../../../Organisms/Dallant/TerminateSeason';
import CreateSeason from '../../../Organisms/Dallant/CreateSeason';
import { DallantsSettingType } from '../../../../interface/Dallants';

interface DallantSettingProps {
  initialSetting: DallantsSettingType | undefined
  isSettingLoading: boolean;
}

const DallantSetting = ({ initialSetting, isSettingLoading }: DallantSettingProps) => {
  

  return (
    <>
      <BlockContainer firstBlock>
        <SimpleAlerts 
          title='사용주의'
          description='시스템의 계속적인 사용을 위해서 시즌제로 달란트를 관리하고자 합니다. 그래서 달란트를 모으는 시즌을 시작/중지하는 방식으로 운영하겠습니다'
        />
        {isSettingLoading ? (
          <Spinner />
        ) : (
          <div>
            {initialSetting !== undefined && (
              <div>
                {initialSetting.isActivity ? (
                  <TerminateSeason />
                ) : (
                  <CreateSeason /> 
                )}
              </div>
            )}
          </div>
        )}
      </BlockContainer>
    </>
  );
};

export default DallantSetting;
