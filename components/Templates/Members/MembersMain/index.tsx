import React from "react";
// state
import { useRecoilValue } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";
// components
import MembersStatic from "../MembersStatic";
import MemberInfo from "../MemberInfo";

interface MembersMainProps {}

const MembersMain = ({}: MembersMainProps) => {
  const selectedUserInfo = useRecoilValue(selectedUser);

  return (
    //   <div>{selectedUserInfo === null ? <MembersStatic /> : <MemberInfo />}</div>
    <div>{selectedUserInfo !== null ? <MemberInfo /> : null}</div>
  );
};

export default MembersMain;
