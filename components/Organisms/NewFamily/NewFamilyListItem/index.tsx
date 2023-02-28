import Link from "next/link";
import React from "react";
import { Member } from "../../../../interface/user";
import { covertPhoneNumber } from "../../../../utils/utils";
import Avatar, { AvatarSize } from "../../../Atoms/Avatar";

interface NewFamilyListItemProps {
  member: Member;
}

const NewFamilyListItem = ({ member }: NewFamilyListItemProps) => {
  return (
    <Link href={`/newfamily/${member.name}`}>
      <div className="flex flex-col items-center cursor-pointer">
        <Avatar size={AvatarSize.lg} name={member.name} rounded />
        <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900">
          {member.name} ({member.birthday?.split("-")[0].substring(2)})
        </h3>
        <p className="text-sm leading-6 text-gray-600">
          {covertPhoneNumber(member.phone)}
        </p>
      </div>
    </Link>
  );
};

export default NewFamilyListItem;
