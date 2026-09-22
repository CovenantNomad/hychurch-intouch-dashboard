import {useQuery} from "react-query";
import {getMemberProfileImage} from "../../../firebase/NewFamily/newFamily";
import {Gender, UserGrade} from "../../../graphql/generated";

export interface UserInfomationProps {
  userId: string;
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
  userId,
  name,
  gender,
  grade,
  isActive,
  birthday,
  phone,
  address,
  description,
  registrationDate,
  editModeHandler,
}: UserInfomationProps) => {
  const {data: profileImageUrl} = useQuery(
    ["memberProfileImage", userId],
    () => getMemberProfileImage(userId),
    {
      enabled: !!userId,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      retry: false,
    },
  );

  return (
    <>
      <div
        className={`grid gap-8 ${
          profileImageUrl
            ? "grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]"
            : "grid-cols-1"
        } p-6 border rounded-xl shadow-sm bg-white`}
      >
        <dl className="order-2 grid w-full grid-cols-2 gap-x-4 gap-y-8 min-w-0">
          <div className="col-span-1">
            <dt className="text-sm font-medium">성별</dt>
            <dd className="mt-1.5 text-base">
              {gender === "MAN" ? "형제" : "자매"}
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium">활동등급</dt>
            <dd className="mt-1.5 text-base">{grade} 등급</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium">생년월일</dt>
            <dd className="mt-1.5 text-base">{birthday || "미입력"}</dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium">셀보고서 포함 여부</dt>
            <dd className="mt-1.5 text-base">{isActive ? "포함" : "비포함"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium">휴대폰번호</dt>
            <dd className="mt-1.5 text-base">{phone}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium">주소</dt>
            <dd className="mt-1.5 text-base">{address && address}</dd>
          </div>
          <div className="col-span-2">
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
        {profileImageUrl && (
          <div className="order-1">
            <img
              src={profileImageUrl}
              alt={`${name} 프로필`}
              className="h-auto max-h-[320px] w-auto max-w-[240px] rounded-lg border border-gray-200 object-contain shadow-sm sm:h-[260px] sm:w-[200px] sm:object-cover"
            />
          </div>
        )}
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
