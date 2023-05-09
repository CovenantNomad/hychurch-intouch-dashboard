import React, { useState } from "react";
//components
import Spinner from "../../../Atoms/Spinner";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import SubmitListSection from "../../../Organisms/Reports/SubmitListSection";

interface CellReportSubmitScreenProps {}

const CellReportSubmitScreen = ({}: CellReportSubmitScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <SubmitListSection />
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default CellReportSubmitScreen;
