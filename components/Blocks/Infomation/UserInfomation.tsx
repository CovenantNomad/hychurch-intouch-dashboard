import {Gender, UserGrade} from "../../../graphql/generated";
import Avatar, {AvatarSize} from "../../Atoms/Avatar";

export interface UserInfomationProps {
  name: string;
  gender: Gender | null | undefined;
  grade: UserGrade;
  isActive: boolean;
  birthday: string | null | undefined;
  registrationDate?: string | null | undefined;
  phone: string;
  address: string | null | undefined;
  description: string | null | undefined;
  hasHeader?: boolean;
  editModeHandler?: () => void;
}

const UserInfomation = ({
  name,
  gender,
  grade,
  isActive,
  birthday,
  phone,
  address,
  description,
  registrationDate,
  hasHeader = true,
  editModeHandler,
}: UserInfomationProps) => {
  return (
    <>
      <div className="p-6 border rounded-xl shadow-sm bg-white">
        {hasHeader && (
          <div className="flex gap-x-4 items-center mb-6">
            <Avatar name={name} size={AvatarSize.md} inline />
            <button onClick={editModeHandler}>
              <h6 className="text-xl font-medium tracking-wide hover:text-LINKTEXT">
                {name}
              </h6>
            </button>
          </div>
        )}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium">성별</dt>
            <dd className="mt-1.5 text-base">
              {gender === "MAN" ? "형제" : "자매"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium">생년월일</dt>
            <dd className="mt-1.5 text-base">{birthday || "미입력"}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium">활동등급</dt>
            <dd className="mt-1.5 text-base">{grade} 등급</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium">셀보고서 포함 여부</dt>
            <dd className="mt-1.5 text-base">{isActive ? "포함" : "비포함"}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium">휴대폰번호</dt>
            <dd className="mt-1.5 text-base">{phone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium">주소</dt>
            <dd className="mt-1.5 text-base">{address && address}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium">등록일</dt>
            <dd className="mt-1.5 text-base">
              {registrationDate === null
                ? "미입력"
                : registrationDate === "2022-12-31"
                ? "2023년 이전등록"
                : registrationDate}
            </dd>
          </div>
        </dl>
      </div>
      <div
        className={`p-6 border rounded-xl shadow-sm mt-4 bg-white ${
          !description && "h-20"
        }`}
      >
        <dt className="text-sm font-medium">비고</dt>
        <dd className="mt-2 text-base text-gray-900 whitespace-pre-line">
          {description}
        </dd>
      </div>
    </>
  );
};

export default UserInfomation;
