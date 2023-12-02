import React from "react";
import { Member } from "../../../../interface/user";
import NewFamilyListItem from "../NewFamilyListItem";

interface NewFamilyTeamSectionProps {
  teamList: Member[];
}

const NewFamilyTeamSection = ({ teamList }: NewFamilyTeamSectionProps) => {
  return (
    <div>
      <h6 className="text-xl font-bold">새가족부 멤버</h6>
      <div>
        {teamList.map(member => (
          <NewFamilyListItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default NewFamilyTeamSection;
