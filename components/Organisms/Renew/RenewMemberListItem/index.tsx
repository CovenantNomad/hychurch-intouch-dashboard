import React from "react";
import Link from "next/link";
import { MemberWithTransferOut } from "../../../../interface/user";
import Tooltips from "../../../Atoms/Tooltips/Tooltips";
import { covertPhoneNumber } from "../../../../utils/utils";
import Avatar, { AvatarSize } from "../../../Atoms/Avatar";

interface RenewMemberListItemProps {
  member: MemberWithTransferOut;
}

const RenewMemberListItem = ({ member }: RenewMemberListItemProps) => {
  return (
    <Link
      href={{
        pathname: `/renew/${member.id}`,
        query: {
          transferStatus: member.transferStatus,
          toCellName: member.toCellName,
        },
      }}
      as={`/renew/${member.id}`}
    >
      <div className="flex flex-col items-center cursor-pointer">
        <Avatar size={AvatarSize.lg} name={member.name} rounded />
        <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900">
          {member.name} ({member.birthday?.split("-")[0].substring(2)})
        </h3>
        <p className="text-sm leading-6 text-gray-600">
          {covertPhoneNumber(member.phone)}
        </p>
        {member.transferStatus && <Tooltips text="셀편성 중" />}
      </div>
    </Link>
  );
};

export default RenewMemberListItem;
