import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";
import UserInfomation from "../../../Blocks/Infomation/UserInfomation";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";

interface MemberInfoProps {}

const MemberInfo = ({}: MemberInfoProps) => {
  const [selectedUserInfo, setSelectedUserInfo] = useRecoilState(selectedUser);

  const onCloseHandle = useCallback(() => setSelectedUserInfo(null), []);

  return (
    <div className={`pt-6 pb-16 px-4 bg-white h-full lg:pt-12`}>
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-x-2" onClick={onCloseHandle}>
          <span>닫기</span>
          <CloseIcon />
        </button>
      </div>
      {selectedUserInfo !== null && (
        <UserInfomation
          name={selectedUserInfo.name}
          gender={selectedUserInfo.gender}
          isActive={selectedUserInfo.isActive}
          birthday={selectedUserInfo.birthday}
          phone={selectedUserInfo.phone}
          address={selectedUserInfo.address}
          description={selectedUserInfo.description}
        />
      )}
    </div>
  );
};

export default MemberInfo;
