import React, { useState } from "react";
//components
import Spinner from "../../../Atoms/Spinner";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import SubmitListSection from "../../../Organisms/Reports/SubmitListSection";
import ManualSubmissionSection from "../../../Organisms/Reports/ManualSubmissionSection";

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
          {/* <BlockContainer firstBlock>
            <SubmitListSection />
          </BlockContainer> */}
          <div className="h-screen flex justify-center items-center">
            <h1 className="text-4xl font-bold">
              현재 페이지는
              <br />
              개발 중입니다
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default CellReportSubmitScreen;
