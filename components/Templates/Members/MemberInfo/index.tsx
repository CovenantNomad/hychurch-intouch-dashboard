import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";
import UserInfomation from "../../../Blocks/Infomation/UserInfomation";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";
import BackIcon from "../../../Atoms/Icons/BackIcon";
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
      <div
        className={`flex ${
          isEditMode ? "justify-between" : "justify-end"
        } mb-4 px-2 lg:px-4`}
      >
        {isEditMode && (
          <button
            className="flex items-center"
            onClick={() => setIsEditMode(false)}
          >
            <BackIcon />
            <span>뒤로</span>
          </button>
        )}
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
            hasRegisterDate={false}
            registrationYear={selectedUserInfo.registrationDate?.split("-")[0]}
            registrationMonth={selectedUserInfo.registrationDate?.split("-")[1]}
            registrationDay={selectedUserInfo.registrationDate?.split("-")[2]}
            editModeHandler={setIsEditMode}
          />
        ))}
    </>
  );
};

export default MemberInfo;
