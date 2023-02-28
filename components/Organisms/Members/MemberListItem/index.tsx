import React from "react";
import { SearchUsersQuery } from "../../../../graphql/generated";
import { Member } from "../../../../interface/user";
import { getGender } from "../../../../utils/utils";
import Avatar, { AvatarSize } from "../../../Atoms/Avatar";
import SubTitleText from "../../../Atoms/Typography/SubTitleText";
import TitleText from "../../../Atoms/Typography/TitleText";
import { IoIosPhonePortrait } from "react-icons/io";
import { useSetRecoilState } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";

interface MemberListItemProps {
  member: Member;
  lastItem: boolean;
}

const MemberListItem = ({ member, lastItem }: MemberListItemProps) => {
  const setSelectedUser = useSetRecoilState(selectedUser);

  return (
    <div
      className={`flex items-center py-4 px-2 bg-white ${
        !lastItem && "border-b"
      } cursor-pointer`}
      onClick={() => setSelectedUser(member)}
    >
      <Avatar size={AvatarSize.md} name={member.name} rounded />
      <div className="ml-4 flex-1">
        <TitleText>
          {member.name} {getGender(member.gender!)}
        </TitleText>
        <SubTitleText>{member.cell?.name}</SubTitleText>
      </div>
      <div className="flex items-center gap-x-2">
        <IoIosPhonePortrait size={16} />
        <p>{member.phone}</p>
      </div>
    </div>
  );
};

export default MemberListItem;
