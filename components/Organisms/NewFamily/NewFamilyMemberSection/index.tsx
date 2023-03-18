import React from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import NewFamilyListItem from "../NewFamilyListItem";

interface NewFamilyMemberSectionProps {
  memberList: MemberWithTransferOut[];
}

const NewFamilyMemberSection = ({
  memberList,
}: NewFamilyMemberSectionProps) => {
  return (
    <div>
      <h6 className="text-xl font-bold pb-6">새가족 명단</h6>
      <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        {memberList.map((member) => (
          <NewFamilyListItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default NewFamilyMemberSection;
