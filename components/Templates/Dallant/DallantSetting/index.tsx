import React from 'react';
import Spinner from '../../../Atoms/Spinner';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import SimpleAlerts from '../../../Atoms/Alerts/SimpleAlerts';
import TerminateSeason from '../../../Organisms/Dallant/Settings/TerminateSeason';
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
          description={`시스템의 계속적인 사용을 위해서 시즌제로 달란트를 관리하고자 합니다. 그래서 달란트를 모으는 시즌을 시작/중지하는 방식으로 운영하겠습니다\n새 시즌을 시작할때 개발팀에 알려주세요.`}
        />
        {isSettingLoading ? (
          <Spinner />
        ) : (
          <div>
            {initialSetting !== undefined && (
              <div>
                {initialSetting.isActivity && <TerminateSeason />}
              </div>
            )}
          </div>
        )}
      </BlockContainer>
    </>
  );
};

export default DallantSetting;
