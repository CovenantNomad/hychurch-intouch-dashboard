import {ArrowsUpDownIcon} from "@heroicons/react/20/solid";
import {useRecoilState} from "recoil";
import {TBarnabaProfile} from "../../../../../../interface/barnabas";
import {barnabaSortState} from "../../../../../../stores/barnabaState";
import {calculateAge} from "../../../../../../utils/utils";

type Props = {
  members: TBarnabaProfile[];
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const BarnabaList = ({members}: Props) => {
  const [sortState, setSortState] = useRecoilState(barnabaSortState);

  // 정렬된 데이터
  const sortedMembers = [...members].sort((a, b) => {
    let primaryComparison = 0;

    if (sortState.sortKey === "name") {
      primaryComparison = a.name.localeCompare(b.name, "ko");
    } else if (sortState.sortKey === "cohort") {
      const dateA = a.cohort ? new Date(a.cohort).getTime() : 0;
      const dateB = b.cohort ? new Date(b.cohort).getTime() : 0;
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

  const handleSort = (key: "name" | "cohort" | "birthday" | "gender") => {
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

  return (
    <div>
      <div className="w-full rounded-lg overflow-hidden border border-gray-300">
        {/* Header */}
        <div className="grid grid-cols-12 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
          <div
            className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300 cursor-pointer"
            onClick={() => handleSort("name")}
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
            className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300 cursor-pointer"
            onClick={() => handleSort("birthday")}
          >
            나이 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300">
            현재 진행상태
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300">
            최근 완료한 과정
          </div>
          <div className="h-12 col-span-2 flex items-center justify-center border-r border-gray-300">
            총 교육 횟수
          </div>
          <div
            className="h-12 col-span-1 flex items-center justify-center cursor-pointer"
            onClick={() => handleSort("cohort")}
          >
            기수 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
          </div>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-300">
          {sortedMembers.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-12 text-sm text-center items-center hover:bg-gray-50"
            >
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300">
                {member.name}
              </div>
              <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                {member.gender === "MAN" ? "형제" : "자매"}
              </div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300">
                {calculateAge(member.birthday)}
              </div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300"></div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300"></div>
              <div className="h-10 col-span-2 flex items-center justify-center border-r border-gray-300"></div>
              <div className="h-10 col-span-1 flex items-center justify-center">
                {member.cohort}기
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

export default BarnabaList;
