import {ArrowsUpDownIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {useQuery} from "react-query";
import {useRecoilState} from "recoil";
import {fetchMenteeStatuses} from "../../../../../../firebase/Barnabas/barnabas";
import {
  TAmazingMatchingStatus,
  TMatchingStatus,
} from "../../../../../../interface/barnabas";
import {MemberWithTransferOut} from "../../../../../../interface/user";
import {menteeSortState} from "../../../../../../stores/barnabaState";
import {calculateAge} from "../../../../../../utils/utils";

type Props = {
  members: MemberWithTransferOut[];
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const MenteeTable = ({members}: Props) => {
  const [sortState, setSortState] = useRecoilState(menteeSortState);

  const sortedMembers = [...members].sort((a, b) => {
    let primaryComparison = 0;

    if (sortState.sortKey === "name") {
      primaryComparison = a.name.localeCompare(b.name, "ko");
    } else if (sortState.sortKey === "registrationDate") {
      const dateA = a.registrationDate
        ? new Date(a.registrationDate).getTime()
        : 0;
      const dateB = b.registrationDate
        ? new Date(b.registrationDate).getTime()
        : 0;
      primaryComparison = dateA - dateB;
    } else if (sortState.sortKey === "birthday") {
      const birthdayA = a.birthday || "";
      const birthdayB = b.birthday || "";
      primaryComparison = birthdayA.localeCompare(birthdayB);
    } else if (sortState.sortKey === "gender") {
      const genderA = a.gender || "";
      const genderB = b.gender || "";
      primaryComparison = genderA.localeCompare(genderB, "ko");
    }

    //정렬 방향 적용
    if (sortState.sortOrder === "desc") {
      primaryComparison *= -1;
    }

    //1차 정렬 값이 같으면 이름 오름차순 정렬
    if (primaryComparison === 0) {
      return a.name.localeCompare(b.name, "ko");
    }

    return primaryComparison;
  });

  const handleSort = (
    key: "name" | "registrationDate" | "birthday" | "gender"
  ) => {
    if (sortState.sortKey === key) {
      setSortState((prevState) => ({
        ...prevState,
        sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
      }));
    } else {
      setSortState((prevState) => ({
        ...prevState,
        sortKey: key,
        sortOrder: "asc",
      }));
    }
  };

  // 페이지네이션 데이터
  const totalPages = Math.ceil(sortedMembers.length / sortState.itemsPerPage);
  const paginatedMembers = sortedMembers.slice(
    (sortState.currentPage - 1) * sortState.itemsPerPage,
    sortState.currentPage * sortState.itemsPerPage
  );

  // 페이지 이동 함수
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setSortState((prevState) => ({
        ...prevState,
        currentPage: page,
      }));
    }
  };

  const {
    data: menteeStatuses,
    isLoading,
    error,
  } = useQuery(
    [
      "fetchMenteeStatuses",
      `menteeTable_${sortState.itemsPerPage}_${sortState.currentPage}`,
    ], // 캐시 키
    () => fetchMenteeStatuses(paginatedMembers),
    {
      enabled: !!sortedMembers.length, // sortedMembers가 있을 때만 실행
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
      cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 보관
    }
  );

  return (
    <div>
      <div className="w-full rounded-lg overflow-hidden border border-gray-300">
        {/* Header */}
        <div className="grid grid-cols-12 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
          <div
            onClick={() => handleSort("name")}
            className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300 cursor-pointer"
          >
            이름 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
          <div
            onClick={() => handleSort("gender")}
            className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300"
          >
            성별 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
          <div
            className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
            onClick={() => handleSort("birthday")}
          >
            나이 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
          <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
            전화번호
          </div>
          <div
            className="h-12 col-span-1 flex items-center justify-center cursor-pointer border-r border-gray-300"
            onClick={() => handleSort("registrationDate")}
          >
            등록일 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300">
            현재과정
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300">
            진행상태
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center">
            셀편성
          </div>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-300">
          {paginatedMembers.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-12 text-sm text-center items-center hover:bg-gray-50"
            >
              <Link
                href={{
                  pathname: `/blessing/${member.id}`,
                  query: {
                    transferStatus: member.transferStatus,
                    toCellName: member.toCellName,
                  },
                }}
                as={`/blessing/${member.id}`}
              >
                <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300 cursor-pointer">
                  {member.name}
                </div>
              </Link>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                {member.gender === "MAN" ? "형제" : "자매"}
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                {calculateAge(member.birthday)}
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                {member.phone}
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                {member.registrationDate}
              </div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300">
                <div className="flex items-center space-x-2 text-gray-300">
                  {/* 웰컴 (바나바도 아니고 어메이징도 아닐 때) */}
                  {
                    <span
                      className={`${
                        !menteeStatuses?.[member.id]?.isInBarnaba &&
                        !menteeStatuses?.[member.id]?.isInAmazing &&
                        "text-rose-500"
                      }`}
                    >
                      웰컴
                    </span>
                  }
                  <span className="text-gray-600">|</span>
                  {/* 바나바 과정 */}
                  <span
                    className={`${
                      menteeStatuses?.[member.id]?.isInBarnaba &&
                      "text-emerald-500"
                    }`}
                  >
                    바나바
                  </span>
                  <span className="text-gray-600">|</span>
                  {/* 어메이징 과정 */}
                  <span
                    className={`${
                      menteeStatuses?.[member.id]?.isInAmazing && "text-sky-500"
                    }`}
                  >
                    어메이징
                  </span>
                </div>
              </div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300">
                <div className="flex items-center space-x-2 text-gray-300">
                  {menteeStatuses?.[member.id]?.isInBarnaba && (
                    <>
                      <span
                        className={`${
                          menteeStatuses?.[member.id]?.barnabaStatus ===
                            TMatchingStatus.PROGRESS && "text-emerald-500"
                        }`}
                      >
                        진행중
                      </span>
                      <span className="text-gray-600">|</span>
                      <span
                        className={`${
                          menteeStatuses?.[member.id]?.barnabaStatus ===
                            TMatchingStatus.COMPLETED && "text-blue-500"
                        }`}
                      >
                        완료
                      </span>
                      <span className="text-gray-600">|</span>
                      <span
                        className={`${
                          menteeStatuses?.[member.id]?.barnabaStatus ===
                            TMatchingStatus.FAILED && "text-rose-500"
                        }`}
                      >
                        미이수
                      </span>
                    </>
                  )}
                  {menteeStatuses?.[member.id]?.isInAmazing && (
                    <>
                      <span
                        className={`${
                          menteeStatuses?.[member.id]?.barnabaStatus ===
                            TAmazingMatchingStatus.PROGRESS && "text-amber-500"
                        }`}
                      >
                        참여중
                      </span>
                      <span className="text-gray-600">|</span>
                      <span
                        className={`${
                          menteeStatuses?.[member.id]?.barnabaStatus ===
                            TAmazingMatchingStatus.COMPLETED && "text-blue-500"
                        }`}
                      >
                        완료
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-10 col-span-2 flex items-center justify-center">
                {member.transferStatus && (
                  <span className="text-white bg-emerald-500 px-2 py-1 rounded-full text-xs">
                    셀편성중
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center mt-6">
        {/* 한 페이지당 항목 수 선택 */}
        <div>
          <label className="text-sm">한 페이지 표시: </label>
          <select
            value={sortState.itemsPerPage}
            onChange={(e) => {
              setSortState((prevState) => ({
                ...prevState,
                itemsPerPage: parseInt(e.target.value, 10),
                currentPage: 1,
              }));
            }}
            className="ml-2 border px-2 py-1 text-sm rounded"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}개
              </option>
            ))}
          </select>
        </div>

        {/* 페이지 이동 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handlePageChange(sortState.currentPage - 1)}
            className={`px-3 py-1 text-sm rounded border ${
              sortState.currentPage === 1 ? "text-gray-400" : "text-black"
            }`}
            disabled={sortState.currentPage === 1}
          >
            이전
          </button>
          <span>
            {sortState.currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(sortState.currentPage + 1)}
            className={`px-3 py-1 text-sm rounded border ${
              sortState.currentPage === totalPages
                ? "text-gray-400"
                : "text-black"
            }`}
            disabled={sortState.currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeTable;
