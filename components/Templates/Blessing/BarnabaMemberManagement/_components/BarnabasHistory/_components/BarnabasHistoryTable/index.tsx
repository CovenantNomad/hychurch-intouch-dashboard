import {ArrowsUpDownIcon} from "@heroicons/react/24/outline";
import {useRecoilState} from "recoil";
import {TBarnabasHistory} from "../../../../../../../../interface/barnabas";
import {barnabasTrainingHistorySortState} from "../../../../../../../../stores/barnabaState";

type Props = {
  data: Omit<TBarnabasHistory, "barnabasDetails">[];
};

const BarnabasHistoryTable = ({data}: Props) => {
  const [sortState, setSortState] = useRecoilState(
    barnabasTrainingHistorySortState
  );

  const sortedMembers = [...data].sort((a, b) => {
    let primaryComparison = 0;

    if (sortState.sortKey === "name") {
      primaryComparison = a.barnabaName.localeCompare(b.barnabaName, "ko");
    } else if (sortState.sortKey === "total") {
      primaryComparison = (a.total ?? 0) - (b.total ?? 0); // ✅ 숫자 정렬
    } else if (sortState.sortKey === "pass") {
      primaryComparison = (a.pass ?? 0) - (b.pass ?? 0); // ✅ 숫자 정렬
    }

    // 정렬 방향 적용
    if (sortState.sortOrder === "desc") {
      primaryComparison *= -1;
    }

    // 1차 정렬 값이 같으면 이름 오름차순 정렬
    if (primaryComparison === 0) {
      return a.barnabaName.localeCompare(b.barnabaName, "ko");
    }

    return primaryComparison;
  });

  const handleSort = (key: "name" | "total" | "pass") => {
    if (sortState.sortKey === key) {
      setSortState((prevState) => ({
        ...prevState,
        sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
      }));
    } else {
      setSortState((prevState) => ({
        ...prevState,
        sortKey: key,
        sortOrder: key === "name" ? "asc" : "desc",
      }));
    }
  };

  return (
    <>
      <div className="flex justify-start text-sm mb-2">
        <span>
          정렬기준:{" "}
          {sortState.sortKey === "name"
            ? "바나바 이름"
            : sortState.sortKey === "pass"
            ? "수료한 멘티"
            : "양육한 멘티"}
        </span>
      </div>

      <table className="w-full">
        {/* Table Head */}
        <thead className="bg-gray-100 border border-gray-300 text-sm text-gray-600">
          <tr className="text-center divide-x divide-gray-300">
            <th className="h-12 w-[5%]">순번</th>
            <th
              className="h-12  w-[19%] cursor-pointer"
              onClick={() => handleSort("name")}
            >
              바나바 이름
              <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </th>
            <th
              className="h-12  w-[19%] cursor-pointer"
              onClick={() => handleSort("total")}
            >
              양육한 멘티
              <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </th>
            <th
              className="h-12  w-[19%] cursor-pointer"
              onClick={() => handleSort("pass")}
            >
              수료한 멘티
              <ArrowsUpDownIcon className="inline-block h-4 w-4 ml-2" />
            </th>
            <th className="h-12 w-[19%] ">보류한 멘티</th>
            <th className="h-12 w-[19%] ">진행중인 멘티</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-300 border-b border-x border-gray-300">
          {sortedMembers.map((barnabas, index) => (
            <tr
              key={index}
              className="text-center divide-x divide-gray-300 hover:bg-gray-50"
            >
              <td className="h-10">{index + 1}</td>
              <td className="h-10">{barnabas.barnabaName}</td>
              <td className="h-10">{barnabas.total}</td>
              <td className="h-10">{barnabas.pass}</td>
              <td className="h-10">{barnabas.fail}</td>
              <td className="h-10">
                {barnabas.total - barnabas.pass - barnabas.fail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BarnabasHistoryTable;
