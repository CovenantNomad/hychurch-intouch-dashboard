import React from "react";
import { Member } from "../../../../interface/user";

interface NewFamilyTeamSectionProps {
  teamList: Member[];
}

const NewFamilyTeamSection = ({ teamList }: NewFamilyTeamSectionProps) => {
  return (
    <div>
      <h6 className="text-xl font-bold">새가족부 멤버</h6>
    </div>
  );
};

export default NewFamilyTeamSection;
