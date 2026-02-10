import dayjs from "dayjs";
import Link from "next/link";
import {Member} from "../../../../interface/user";
import {getCellUrl, getGender} from "../../../../utils/utils";
import TitleText from "../../../Atoms/Typography/TitleText";

interface MemberListItemProps {
  member: Member;
}

const MemberListItem = ({member}: MemberListItemProps) => {
  return (
    <Link
      href={{
        pathname: getCellUrl(member.cell?.id, member.id),
      }}
    >
      <div
        className={`flex py-6 px-5 border border-gray-200 rounded-lg cursor-pointer`}
      >
        {/* <div className="mr-4">
          <Avatar size={AvatarSize.md} name={member.name} rounded />
        </div> */}
        <div className="w-full flex flex-col">
          <div className="flex items-baseline pb-0.5 border-b border-gray-400">
            <TitleText>
              {member.name} {getGender(member.gender!)}
            </TitleText>
            <p className="text-base text-gray-800 ml-2">
              [{member.cell ? member.cell.name : "재적"}]
            </p>
          </div>
          <div className="mt-4 text-sm">
            <p>
              ∙ 나이 :{" "}
              {member.birthday && (
                <>
                  {member.birthday?.split("-")[0] !== "1900" && (
                    <>
                      {member.birthday?.split("-")[0] !== "1900"
                        ? dayjs().get("year") -
                          Number(member.birthday?.split("-")[0]) +
                          "세"
                        : ""}{" "}
                      (
                      {member.birthday?.split("-")[0] !== "1900"
                        ? member.birthday
                        : ""}
                      )
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="mt-2 text-sm">
            <p>∙ 연락처 : {member.phone}</p>
          </div>
          <p className="text-sm mt-2">
            ∙ 등록일 :{" "}
            {!member.registrationDate
              ? "기록없음"
              : member.registrationDate === "2022-12-31"
                ? "2023년 이전등록자"
                : member.registrationDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MemberListItem;
