import {ArrowsUpDownIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {useRecoilState} from "recoil";
import {RoleType} from "../../../../../../graphql/generated";
import {Member} from "../../../../../../interface/user";
import {cellMemberSortState} from "../../../../../../stores/cellState";
import {calculateAge, formatPhoneNumber} from "../../../../../../utils/utils";
import CellMemberListItem from "./_components/CellMemberListItem";

type Props = {
  members: Member[];
};

const CellMemberList = ({members}: Props) => {
  const [sortState, setSortState] = useRecoilState(cellMemberSortState);

  const leaders = members.filter((member) =>
    member.roles.includes(RoleType.CellLeader)
  );

  const cellMembers = members.filter(
    (member) => !member.roles.includes(RoleType.CellLeader)
  );

  const sortedMembers = [...cellMembers].sort((a, b) => {
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
    } else if (sortState.sortKey === "grade") {
      const gradeA = a.grade || "";
      const gradeB = b.grade || "";
      primaryComparison = gradeA.localeCompare(gradeB, "ko");
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
    key: "name" | "registrationDate" | "birthday" | "gender" | "grade"
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

  const sortKeyMap: Record<string, string> = {
    name: "이름",
    registrationDate: "등록일",
    birthday: "나이",
    gender: "성별",
  };

  const label = sortKeyMap[sortState.sortKey] ?? "활동등급";

  return (
    <div>
      <div>
        <h3 className="mb-2">셀리더</h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <CellMemberListItem member={leaders[0]} />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-2">셀원명단</h3>
        <div className="flex justify-end text-sm mb-2">
          <span>정렬기준: {label}</span>
        </div>
        <div className="w-full rounded-lg overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
            <div
              onClick={() => handleSort("name")}
              className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
            >
              이름 <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </div>
            <div
              onClick={() => handleSort("gender")}
              className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300"
            >
              성별 <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </div>
            <div
              className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
              onClick={() => handleSort("birthday")}
            >
              나이 <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </div>
            <div
              className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
              onClick={() => handleSort("birthday")}
            >
              생년월일
            </div>
            <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
              전화번호
            </div>
            <div
              className="h-12 col-span-1 flex items-center justify-center cursor-pointer border-r border-gray-300"
              onClick={() => handleSort("registrationDate")}
            >
              등록일 <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </div>
            <div
              onClick={() => handleSort("grade")}
              className="h-12 col-span-1 flex items-center justify-center"
            >
              활동등급{" "}
              <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </div>
          </div>

          {/* Body */}
          <div className="divide-y divide-gray-300">
            {sortedMembers.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-7 text-sm text-center items-center hover:bg-gray-50"
              >
                <Link
                  href={{
                    pathname: `/cells/${member.cell?.id}/members/${member.id}`,
                  }}
                >
                  <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer">
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
                  {member.birthday}
                </div>
                <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                  {formatPhoneNumber(member.phone)}
                </div>
                <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
                  {member.registrationDate}
                </div>
                <div className="h-10 col-span-1 flex items-center justify-center">
                  {member.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellMemberList;
