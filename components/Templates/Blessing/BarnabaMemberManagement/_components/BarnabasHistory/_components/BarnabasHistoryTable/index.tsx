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
        sortOrder: "asc",
      }));
    }
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="grid grid-cols-7 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
        <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
          순번
        </div>
        <div
          onClick={() => handleSort("name")}
          className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
        >
          바나바 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
        </div>
        <div
          onClick={() => handleSort("total")}
          className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
        >
          양육기회 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
        </div>
        <div
          onClick={() => handleSort("pass")}
          className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300 cursor-pointer"
        >
          양육수료 <ArrowsUpDownIcon className="inline-block h-4 w-4" />
        </div>
        <div className="h-12 col-span-1 flex items-center justify-center cursor-pointer border-r border-gray-300">
          양육보류
        </div>
        <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
          양육진행중
        </div>
        <div className="h-12 col-span-1 flex items-center justify-center border-r border-gray-300">
          양육수료비율
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-300">
        {sortedMembers.map((barnabas, index) => (
          <div
            key={index}
            className="grid grid-cols-7 text-sm text-center items-center hover:bg-gray-50"
          >
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {index + 1}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {barnabas.barnabaName}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {barnabas.total}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {barnabas.pass}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {barnabas.fail}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
              {barnabas.total - barnabas.pass - barnabas.fail}
            </div>
            <div className="h-10 col-span-1 flex items-center justify-center ">
              {Math.round((barnabas.pass / barnabas.total) * 100) + "%"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarnabasHistoryTable;
