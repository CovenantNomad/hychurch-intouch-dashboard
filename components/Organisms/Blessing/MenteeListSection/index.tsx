import React from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import MenteeListItem from "../MenteeListItem";

interface MenteeListSectionProps {
  memberList: MemberWithTransferOut[];
}

const MenteeListSection = ({ memberList }: MenteeListSectionProps) => {
  return (
    <div>
      <h6 className="text-xl font-bold pb-6">멘티 명단</h6>
      <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        {memberList
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
          .map((member) => (
            <MenteeListItem key={member.id} member={member} />
          ))}
      </div>
    </div>
  );
};

export default MenteeListSection;
