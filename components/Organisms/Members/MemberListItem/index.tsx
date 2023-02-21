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
}

const MemberListItem = ({ member }: MemberListItemProps) => {
  const setSelectedUser = useSetRecoilState(selectedUser);
  const nameCheck = /^[a-zA-Z]*$/;

  return (
    <div
      className="flex items-center py-4 px-2 bg-white border-b cursor-pointer"
      onClick={() => setSelectedUser(member)}
    >
      <Avatar
        size={AvatarSize.md}
        name={member.name.substring(
          nameCheck.test(member.name)
            ? member.name.length - 3
            : member.name.length - 2
        )}
        rounded
      />
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
