import React from "react";
import SubmitList from "../../../Atoms/StackedLists/SubmitList";

interface SubmitListSectionProps {}

const SubmitListSection = ({}: SubmitListSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8">
      <SubmitList title={"수기제출 셀"} />
      <SubmitList title={"온라인제출 셀"} />
      <SubmitList title={"제출 안한 셀"} />
    </div>
  );
};

export default SubmitListSection;
