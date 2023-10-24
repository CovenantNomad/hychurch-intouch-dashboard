import React from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import SimpleAlerts from '../../../Atoms/Alerts/SimpleAlerts';
import CellDayRestaurantSection from '../../../Organisms/Dallant/CellDayRestaurantSection';
import CellDayOpening from '../../../Organisms/Dallant/CellDayOpening';
import { DallantsSettingType } from '../../../../interface/Dallants';

interface CellDayProps {}

const CellDay = ({}: CellDayProps) => {
  
  return (
    <>
      <BlockContainer firstBlock>
        <SimpleAlerts 
          title='사용방법'
          description={`1. 먼저, 상점를 오픈해주세요.\n2. 상점을 선택해서 메뉴를 추가해주세요.\n3. 이름, 가격, 상품 이미지를 입력해 주세요.\n4. 영업시작 버튼을 눌러야 리더스에서 주문 가능합니다.`} 
        />
      </BlockContainer>
      <CellDayRestaurantSection />
      <BlockContainer>
        <CellDayOpening />
      </BlockContainer>
    </>
  );
};

export default CellDay;
