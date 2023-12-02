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
      <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        {teamList.map(member => (
          <NewFamilyListItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default NewFamilyTeamSection;
