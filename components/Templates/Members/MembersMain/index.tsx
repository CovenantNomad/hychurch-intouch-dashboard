import React, { useEffect } from "react";
// state
import { useRecoilState } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";
// components
import MembersStatic from "../MembersStatic";
import MemberInfo from "../MemberInfo";

interface MembersMainProps {}

const MembersMain = ({}: MembersMainProps) => {
  const [selectedUserInfo, setSelectedUserInfo] = useRecoilState(selectedUser);

  useEffect(() => {
    return () => {
      setSelectedUserInfo(null);
    };
  }, []);

  return (
    //   <div>{selectedUserInfo === null ? <MembersStatic /> : <MemberInfo />}</div>
    <div>{selectedUserInfo === null ? null : <MemberInfo />}</div>
  );
};

export default MembersMain;
