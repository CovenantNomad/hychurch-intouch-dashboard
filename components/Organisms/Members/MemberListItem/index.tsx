import React from "react";
import { Member } from "../../../../interface/user";
import { getCellUrl, getGender } from "../../../../utils/utils";
import Avatar, { AvatarSize } from "../../../Atoms/Avatar";
import SubTitleText from "../../../Atoms/Typography/SubTitleText";
import TitleText from "../../../Atoms/Typography/TitleText";
import dayjs from "dayjs";
import Link from "next/link";

interface MemberListItemProps {
  member: Member;
}

const MemberListItem = ({ member }: MemberListItemProps) => {

  return (
    <Link
    href={{
      pathname: getCellUrl(member.cell?.id, member.id),
    }}
    >
      <div
        className={`flex py-6 px-4 border border-gray-200 rounded-md cursor-pointer`}
      >
        <div className="mr-4">
          <Avatar size={AvatarSize.md} name={member.name} rounded />
        </div>
        <div className="flex flex-col">
          <div>
            <TitleText>
              {member.name} {getGender(member.gender!)}
            </TitleText>
            <p className="flex space-x-3 items-center">
              <SubTitleText>{member.cell ? member.cell.name : "재적"}</SubTitleText>
              {member.birthday && (
                <>
                  {member.birthday?.split('-')[0] !== '1900' && (
                    <>
                      <SubTitleText>|</SubTitleText>
                      <SubTitleText>{member.birthday?.split('-')[0] !== '1900' ? (dayjs().get('year') - Number(member.birthday?.split('-')[0])) + "세" : ''}</SubTitleText>
                      <SubTitleText>|</SubTitleText>
                      <SubTitleText>{member.birthday?.split('-')[0] !== '1900' ? member.birthday : ''}</SubTitleText>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col space-y-1 mt-4 text-sm">
            {member.address && <p>∙ 주소 : {member.address}</p>}
            <p>∙ 연락처 : {member.phone}</p>
          </div>
          {member.registrationDate && <p className="text-sm mt-4">∙ 등록일 : {member.registrationDate === '2022-12-31' ? "2023년 이전등록자" : member.registrationDate}</p>}
        </div>
      </div>
    </Link>
  );
};

export default MemberListItem;
