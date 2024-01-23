import { Dayjs } from "dayjs";
// components
import AttendanceTableRow from "./AttendanceTableRow";
import AttendanceTableHeader from "./AttendanceTableHeader";
import AttendanceTableRowSkeleton from "./AttendanceTableRowSkeleton";
// hooks
import useOrderedCellList from "../../../../hooks/useOrderedCellList";

type AttendnaceTableProps = {
  recentSunday: Dayjs
}

const AttendnaceTable = ({ recentSunday }: AttendnaceTableProps) => {
  const { isLoading, orderedCellList, newFamily, blessing, renew } = useOrderedCellList()

  return (
    <>
      <div className="pt-3 pb-1 lg:hidden">
        <p className="font-bold leading-[1.5]">
          이번주 셀별 예배 출석명단은 PC전용 화면입니다
          <br/>
          모바일에서는 예배별 출석인원만 보여줍니다.
        </p>
      </div>
      <table className="hidden relative min-w-full border border-gray-200 lg:table">
        <AttendanceTableHeader />
        {isLoading ? (
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <AttendanceTableRowSkeleton key={index} />
            ))}
          </tbody>
        ) : (
          <>
            {orderedCellList && newFamily && blessing && renew ? (
              <tbody className="divide-y divide-gray-200">
                {orderedCellList.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                <AttendanceTableRow cell={newFamily} recentSunday={recentSunday}/>
                <AttendanceTableRow cell={blessing} recentSunday={recentSunday}/>
                <AttendanceTableRow cell={renew} recentSunday={recentSunday}/>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                <tr className="grid grid-cols-1 items-center text-center divide-x">
                  <td className="h-full col-span-1 flex items-center justify-center text-base font-bold py-6">요청하신 데이터가 존재하지 않습니다</td>
                </tr>
              </tbody>
            )}
          </>
        )}
      </table>
    </>
  );
};

export default AttendnaceTable;
