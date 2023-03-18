import React, { useState } from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";

interface AbsenceMemberProps {}

const AbsenceMember = ({}: AbsenceMemberProps) => {
  const [withdrawalList, setWithdrawalList] = useState<MemberWithTransferOut[]>(
    []
  );

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <h6 className="text-xl font-bold pb-6">부재 청년</h6>
          {/* <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
            {memberList.map((member) => (
              <RenewMemberListItem key={member.id} member={member} />
            ))}
          </div> */}
        </div>
      </BlockContainer>
    </>
  );
};

export default AbsenceMember;
