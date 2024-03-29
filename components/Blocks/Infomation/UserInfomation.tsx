import { Gender, UserGrade } from "../../../graphql/generated";
import Avatar, { AvatarSize } from "../../Atoms/Avatar";

export interface UserInfomationProps {
  name: string;
  gender: Gender | null | undefined;
  grade: UserGrade
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
      <div className="border px-4 py-4 rounded-md bg-white">
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
            <dt className="text-sm font-medium text-gray-500">성별</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {gender === "MAN" ? "형제" : "자매"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">생년월일</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {birthday || "미입력"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">활동등급</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {grade}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">셀보고서 포함 여부</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {isActive ? "포함" : "비포함"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">휴대폰번호</dt>
            <dd className="mt-1 text-sm text-gray-900">{phone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">주소</dt>
            <dd className="mt-1 text-sm text-gray-900">{address && address}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">등록일</dt>
            <dd className="mt-1 text-sm text-gray-900">{registrationDate === null ? "미입력" : registrationDate === "2022-12-31" ? "2023년 이전등록" : registrationDate}</dd>
          </div>
        </dl>
      </div>
      <div
        className={`border px-4 py-4 mt-4 rounded-md bg-white ${
          !description && "h-20"
        }`}
      >
        <dt className="text-sm font-medium text-gray-500">비고</dt>
        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">
          {description}
        </dd>
      </div>
    </>
  );
};

export default UserInfomation;
