import React from "react";
import { Member } from "../../../../interface/user";

interface NewFamilyTeamSectionProps {
  teamList: Member[];
}

const NewFamilyTeamSection = ({ teamList }: NewFamilyTeamSectionProps) => {
  return (
    <div>
      <h6 className="text-xl font-bold">Our team</h6>
    </div>
  );
};

export default NewFamilyTeamSection;
