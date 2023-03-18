import React from "react";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import SectionContainer from "../../Atoms/Container/SectionContainer";

interface CellReportScreenProps {}

const CellReportScreen = ({}: CellReportScreenProps) => {
  return (
    <SectionContainer>
      <BlockContainer firstBlock>
        <h6 className="text-lg font-bold text-gray-900 py-5">셀 보고서</h6>
        <p>현재 기능 개발중입니다</p>
      </BlockContainer>
    </SectionContainer>
  );
};

export default CellReportScreen;
