import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";
import UserInfomation from "../../../Blocks/Infomation/UserInfomation";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";
import Button from "../../../Atoms/Button/Button";
import EditUserInfomation from "../../../Blocks/Infomation/EditUserInfomation";

interface MemberInfoProps {}

const MemberInfo = ({}: MemberInfoProps) => {
  const [selectedUserInfo, setSelectedUserInfo] = useRecoilState(selectedUser);
  const [isEditMode, setIsEditMode] = useState(false);

  const onCloseHandle = useCallback(
    () => setSelectedUserInfo(null),
    [setSelectedUserInfo]
  );

  const onOpenEditHandler = useCallback(() => {
    setIsEditMode(true);
  }, []);

  return (
    <>
      <div className="flex justify-end mb-3">
        <button className="flex items-center gap-x-2" onClick={onCloseHandle}>
          <span>닫기</span>
          <CloseIcon />
        </button>
      </div>
      {selectedUserInfo !== null &&
        (!isEditMode ? (
          <UserInfomation
            name={selectedUserInfo.name}
            gender={selectedUserInfo.gender}
            isActive={selectedUserInfo.isActive}
            birthday={selectedUserInfo.birthday}
            phone={selectedUserInfo.phone}
            address={selectedUserInfo.address}
            description={selectedUserInfo.description}
            editModeHandler={onOpenEditHandler}
          />
        ) : (
          <EditUserInfomation
            id={selectedUserInfo.id}
            name={selectedUserInfo.name}
            gender={selectedUserInfo.gender}
            isActive={selectedUserInfo.isActive}
            birthday={selectedUserInfo.birthday}
            phone={selectedUserInfo.phone}
            address={selectedUserInfo.address}
            description={selectedUserInfo.description}
            cell={selectedUserInfo.cell}
            editModeHandler={setIsEditMode}
          />
        ))}
    </>
  );
};

export default MemberInfo;
