import React, { useState } from "react";
//components
import Spinner from "../../../Atoms/Spinner";
import BlockContainer from "../../../Atoms/Container/BlockContainer";

interface AttendanceReportScreenProps {}

const AttendanceReportScreen = ({}: AttendanceReportScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>출석체크</BlockContainer>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
