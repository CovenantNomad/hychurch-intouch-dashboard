import React from "react";
import { SearchUsersQuery } from "../../../graphql/generated";
import { Member } from "../../../interface/user";
import { getGender } from "../../../utils/utils";
import Avatar, { AvatarSize } from "../../Atoms/Avatar";
import SubTitleText from "../../Atoms/Typography/SubTitleText";
import TitleText from "../../Atoms/Typography/TitleText";
import { IoIosPhonePortrait } from "react-icons/io";
import { useSetRecoilState } from "recoil";
import { selectedUser } from "../../../stores/selectedUser";

interface UserListItemProps {
  user: Member;
}

const UserListItem = ({ user }: UserListItemProps) => {
  const setSelectedUser = useSetRecoilState(selectedUser);

  return (
    <div
      className="flex items-center py-4 px-2 bg-white border-b cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      <Avatar size={AvatarSize.md} name={user.name.substr(-2)} rounded />
      <div className="ml-4 flex-1">
        <TitleText>
          {user.name} {getGender(user.gender!)}
        </TitleText>
        <SubTitleText>{user.cell?.name}</SubTitleText>
      </div>
      <div className="flex items-center gap-x-2">
        <IoIosPhonePortrait size={16} />
        <p>{user.phone}</p>
      </div>
    </div>
  );
};

export default UserListItem;
