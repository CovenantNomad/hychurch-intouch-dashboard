import React from "react";
import SectionContainer from "../../../Atoms/SectionContainer";
import MentorListSection from "../../../Organisms/Blessing/MentorListSection/MentorListSection";
import MentorSelection from "../../../Organisms/Blessing/MentorSelection/MentorSelection";

interface MentorManagementProps {}

const MentorManagement = ({}: MentorManagementProps) => {
  return (
    <div>
      <div>
        <MentorSelection />
      </div>
      <div className="mt-2">
        <MentorListSection />
      </div>
    </div>
  );
};

export default MentorManagement;
