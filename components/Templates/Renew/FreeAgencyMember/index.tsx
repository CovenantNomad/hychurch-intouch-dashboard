import React from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import RenewMemberListItem from "../../../Organisms/Renew/RenewMemberListItem";

interface FreeAgencyMemberProps {
  memberList: MemberWithTransferOut[];
}

const FreeAgencyMember = ({ memberList }: FreeAgencyMemberProps) => {
  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <h6 className="text-xl font-bold pb-6">셀 미참여 활동청년</h6>
          <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
            {memberList
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (b.name > a.name) return -1;
                else return 0;
              })
              .map((member) => (
                <RenewMemberListItem key={member.id} member={member} />
              ))}
          </div>
        </div>
      </BlockContainer>
    </>
  );
};

export default FreeAgencyMember;
