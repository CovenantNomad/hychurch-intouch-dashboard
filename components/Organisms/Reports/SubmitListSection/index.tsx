import React from "react";
import SubmitList from "../../../Atoms/StackedLists/SubmitList";

interface SubmitListSectionProps {}

const SubmitListSection = ({}: SubmitListSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
      <SubmitList title={"제출완료 셀"} />
      <SubmitList title={"미 제출 셀"} />
    </div>
  );
};

export default SubmitListSection;
