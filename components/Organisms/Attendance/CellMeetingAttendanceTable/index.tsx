import {Dayjs} from "dayjs";
import useOrderedCellList from "../../../../hooks/useOrderedCellList";
import CellMeetingAttendanceHeader from "./CellMeetingAttendanceTableHeader";
import CellMeetingAttendanceTableRow from "./CellMeetingAttendanceTableRow";
import CellMeetingAttendanceTableRowSkeleton from "./CellMeetingAttendanceTableRowSkeleton";

type CellMeetingAttendanceTableProps = {
  recentSunday: Dayjs;
};

const CellMeetingAttendanceTable = ({
  recentSunday,
}: CellMeetingAttendanceTableProps) => {
  const {isLoading, orderedCellList} = useOrderedCellList();

  return (
    <>
      <div className="pt-3 pb-1 lg:hidden">
        <p className="font-bold leading-[1.5]">
          이번주 셀모임 출석명단은 PC전용 화면입니다
          <br />
          모바일에서는 셀모임 출석인원만 보여줍니다.
        </p>
      </div>
      <table className="hidden relative min-w-full border border-gray-200 lg:table">
        <CellMeetingAttendanceHeader />
        {isLoading ? (
          <tbody className="divide-y divide-gray-200">
            {Array.from({length: 5}).map((_, index) => (
              <CellMeetingAttendanceTableRowSkeleton key={index} />
            ))}
          </tbody>
        ) : (
          <tbody className="divide-y divide-gray-200">
            {orderedCellList ? (
              <>
                {orderedCellList?.map((cell) => (
                  <CellMeetingAttendanceTableRow
                    key={cell.id}
                    cell={cell}
                    baseDateString={recentSunday.format("YYYY-MM-DD")}
                  />
                ))}
              </>
            ) : (
              <tr className="grid grid-cols-1 items-center text-center divide-x">
                <td className="h-full col-span-1 flex items-center justify-center text-base font-bold py-6">
                  요청하신 데이터가 존재하지 않습니다
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </>
  );
};

export default CellMeetingAttendanceTable;
