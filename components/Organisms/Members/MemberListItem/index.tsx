import {UserIcon} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Link from "next/link";
import {useQuery} from "react-query";
import {fetchIndividualBarnabaMentorship} from "../../../../firebase/Barnabas/barnabas";
import {getMemberProfileImage} from "../../../../firebase/NewFamily/newFamily";
import {Member} from "../../../../interface/user";
import {
  formatPhoneNumber,
  getCellUrl,
  getGender,
} from "../../../../utils/utils";

interface MemberListItemProps {
  member: Member;
}

const MemberListItem = ({member}: MemberListItemProps) => {
  const {data: profileImageUrl} = useQuery(
    ["memberProfileImage", member.id],
    () => getMemberProfileImage(member.id),
    {
      enabled: !!member.id,
      staleTime: 60 * 60 * 1000,
      cacheTime: 2 * 60 * 60 * 1000,
      retry: false,
    },
  );

  const {data, isLoading, error} = useQuery(
    ["fetchBarnabaMentorship", member.id],
    () => fetchIndividualBarnabaMentorship(member.id),
    {
      enabled: !!member.id, // menteeId가 존재할 때만 실행
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    },
  );

  const birthYear = member.birthday?.split("-")[0];

  const age =
    birthYear && birthYear !== "1900"
      ? dayjs().year() - Number(birthYear)
      : null;

  const registrationDate = !member.registrationDate
    ? "기록없음"
    : member.registrationDate === "2022-12-31"
      ? "2023년 이전등록자"
      : member.registrationDate;

  return (
    <Link
      href={{
        pathname: getCellUrl(member.cell?.id, member.id),
      }}
    >
      <a className="block h-full">
        <div
          className="
            flex h-full items-start gap-4
            rounded-xl border border-gray-200 bg-white
            p-4 transition-colors
            hover:border-gray-300 hover:bg-gray-50
            sm:gap-5 sm:p-5
          "
        >
          {/* 프로필 사진 */}
          <div className="shrink-0">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={`${member.name} 사진`}
                loading="lazy"
                className="w-[72px] h-24 rounded-lg border border-gray-200 object-cover sm:h-28 sm:w-[84px]"
              />
            ) : (
              <div className="flex h-24 w-[72px] items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-28 sm:w-[84px]">
                <UserIcon className="h-9 w-9 text-gray-300 sm:h-10 sm:w-10" />
              </div>
            )}
          </div>

          {/* 회원 정보 */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* 이름 / 소속 */}
            <div className="flex flex-wrap items-center">
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg pr-1">
                {member.name} {getGender(member.gender!)}
              </h3>
              {/* <span className="text-xs px-1">∙</span> */}

              <span className="rounded-md text-base font-medium text-blue-600">
                ({member.cell?.name || "재적"})
              </span>
            </div>

            {/* 나이 / 생년월일 */}
            <div className="mt-2 text-sm">
              {age !== null
                ? `${age}세 (${member.birthday})`
                : "나이 정보 없음"}
            </div>

            {/* 바나바 정보 */}
            {data?.barnabaProfile?.name && data?.mentorship && (
              <div className="mt-2 text-sm">
                바나바: {data.barnabaProfile.name} (
                {data.mentorship.scheduledMeetingCount}주 과정)
              </div>
            )}

            {/* 연락처 / 등록일 */}
            <div
              className={`flex flex-wrap items-center text-sm ${data?.barnabaProfile?.name ? "mt-2" : "mt-6 md:mt-8"}`}
            >
              <div className="flex items-center gap-1.5">
                <span>{formatPhoneNumber(member.phone) || "미입력"}</span>
              </div>
              <span className="px-1 text-gray-700">∙</span>

              <div className="flex items-center gap-1.5">
                <span>등록일: </span>
                <span>{registrationDate}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MemberListItem;
