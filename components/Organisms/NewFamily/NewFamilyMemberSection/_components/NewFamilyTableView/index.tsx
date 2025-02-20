import {ArrowsUpDownIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {useRecoilState} from "recoil";
import {MemberWithTransferOut} from "../../../../../../interface/user";
import {newFamilyListView} from "../../../../../../stores/newFamilyState";
import {getGenderColor} from "../../../../../../utils/utils";
import TransferTooltip from "../../../../../Atoms/Tooltips/TransferTooltip";
import CalculateAgeWithStyle from "../CalculateAgeWithStyle/CalculateAgeWithStyle";

type Props = {
  memberList: MemberWithTransferOut[];
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const NewFamilyTableView = ({memberList}: Props) => {
  const [listViewState, setListViewState] = useRecoilState(newFamilyListView);

  // 정렬된 데이터
  const sortedMembers = [...memberList].sort((a, b) => {
    if (listViewState.sortKey === "name") {
      return listViewState.sortOrder === "asc"
        ? a.name.localeCompare(b.name, "ko")
        : b.name.localeCompare(a.name, "ko");
    } else if (listViewState.sortKey === "registrationDate") {
      // registrationDate가 없는 경우를 처리
      const dateA = a.registrationDate
        ? new Date(a.registrationDate).getTime()
        : 0;
      const dateB = b.registrationDate
        ? new Date(b.registrationDate).getTime()
        : 0;
      return listViewState.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (listViewState.sortKey === "birthday") {
      // birthday가 없는 경우를 처리
      const birthdayA = a.birthday || ""; // 빈 문자열로 대체
      const birthdayB = b.birthday || ""; // 빈 문자열로 대체
      return listViewState.sortOrder === "asc"
        ? birthdayA.localeCompare(birthdayB)
        : birthdayB.localeCompare(birthdayA);
    }
    return 0;
  });

  // 페이지네이션 데이터
  const totalPages = Math.ceil(
    sortedMembers.length / listViewState.itemsPerPage
  );
  const paginatedMembers = sortedMembers.slice(
    (listViewState.currentPage - 1) * listViewState.itemsPerPage,
    listViewState.currentPage * listViewState.itemsPerPage
  );

  // 페이지 이동 함수
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setListViewState((prevState) => ({
        ...prevState,
        currentPage: page,
      }));
    }
  };

  // 정렬 키와 순서 변경
  const handleSort = (key: "name" | "registrationDate" | "birthday") => {
    if (listViewState.sortKey === key) {
      setListViewState((prevState) => ({
        ...prevState,
        sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
      }));
    } else {
      setListViewState((prevState) => ({
        ...prevState,
        sortKey: key,
        sortOrder: "asc",
      }));
    }
  };

  return (
    <div className="pt-8 pb-6">
      {/* 테이블 */}
      <table className="w-full border-collapse border border-gray-300 rounded-lg table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-4 py-3 text-center border border-gray-300 cursor-pointer w-1/12"
              onClick={() => handleSort("name")}
            >
              이름 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
            </th>
            <th
              className="border border-gray-300 px-4 py-3 w-1/12"
              onClick={() => handleSort("birthday")}
            >
              나이 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
            </th>
            <th className="border border-gray-300 px-4 py-3 w-1/12">성별</th>
            <th className="border border-gray-300 px-4 py-3 w-1/12">
              전화번호
            </th>
            <th className="border border-gray-300 px-4 py-3 w-1/4">주소</th>
            <th
              className="px-4 py-3 text-center border border-gray-300 cursor-pointer w-1/12"
              onClick={() => handleSort("registrationDate")}
            >
              등록일 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
            </th>
            <th className="border border-gray-300 px-4 py-3 w-1/12">
              셀편성상태
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedMembers.map((member, index) => (
            <tr key={index} className="text-center border-t hover:bg-gray-50">
              <Link
                href={{
                  pathname: `/newfamily/${member.id}`,
                  query: {
                    transferStatus: member.transferStatus,
                    toCellName: member.toCellName,
                  },
                }}
                as={`/newfamily/${member.id}`}
              >
                <td className="border border-gray-300 px-4 py-3 cursor-pointer hover:bg-gray-100">
                  {member.name}
                </td>
              </Link>
              <CalculateAgeWithStyle birthday={member.birthday} />
              <td
                className={`border border-gray-300 px-4 py-3 ${getGenderColor(
                  member.gender!
                )}`}
              >
                {member.gender === "MAN" ? "형제" : "자매"}
              </td>

              <td className="border border-gray-300 px-4 py-3">
                {member.phone}
              </td>
              <td className="border border-gray-300 px-4 py-3">
                {member.address}
              </td>
              <td className="px-4 py-3 border border-gray-300">
                {member.registrationDate}
              </td>
              <td className="border border-gray-300 px-4 py-3">
                {member.transferStatus && member.toCellName && (
                  <TransferTooltip toCellName={member.toCellName} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center mt-6">
        {/* 한 페이지당 항목 수 선택 */}
        <div>
          <label className="text-sm">한 페이지 표시: </label>
          <select
            value={listViewState.itemsPerPage}
            onChange={(e) => {
              setListViewState((prevState) => ({
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
            onClick={() => handlePageChange(listViewState.currentPage - 1)}
            className={`px-3 py-1 text-sm rounded border ${
              listViewState.currentPage === 1 ? "text-gray-400" : "text-black"
            }`}
            disabled={listViewState.currentPage === 1}
          >
            이전
          </button>
          <span>
            {listViewState.currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(listViewState.currentPage + 1)}
            className={`px-3 py-1 text-sm rounded border ${
              listViewState.currentPage === totalPages
                ? "text-gray-400"
                : "text-black"
            }`}
            disabled={listViewState.currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFamilyTableView;
