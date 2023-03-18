import React from "react";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import SectionContainer from "../../../Atoms/Container/BlockContainer";
import MentorListSection from "../../../Organisms/Blessing/MentorListSection/MentorListSection";
import MentorSelection from "../../../Organisms/Blessing/MentorSelection/MentorSelection";

interface MentorManagementProps {}

const MentorManagement = ({}: MentorManagementProps) => {
  return (
    <>
      <BlockContainer firstBlock>
        <MentorSelection />
      </BlockContainer>
      <BlockContainer>
        <MentorListSection />
      </BlockContainer>
    </>
  );
};

export default MentorManagement;
