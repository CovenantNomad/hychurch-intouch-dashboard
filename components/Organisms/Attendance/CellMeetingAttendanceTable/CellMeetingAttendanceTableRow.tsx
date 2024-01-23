import { CellListType } from "../../../../interface/cell";
import CellMeetingAttendanceTableColumnSkeleton from "./CellMeetingAttendanceTableColumnSkeleton";
import useCellMettingAttendance from "../../../../hooks/useCellMettingAttendance";
import { convertSecondToDate } from "../../../../utils/dateUtils";

type AttendanceByCellProps = {
  cell: CellListType
  baseDateString: string;
}

const CellMeetingAttendanceTableRow = ({ cell, baseDateString }: AttendanceByCellProps) => {
  const { isLoading, absentList, attendanceList, submittedAt } = useCellMettingAttendance(cell.id, baseDateString)

  return (
    <tr className="grid grid-cols-12 items-center text-center divide-x">
      <td className="h-full col-span-2 flex items-center justify-between py-2 px-5">
        <span className="flex items-center">
          {cell.name} 
          {submittedAt ? (
            <svg className="h-1.5 w-1.5 fill-green-500 ml-2" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx={3} cy={3} r={3} />
            </svg>
          ) : (
            <svg className="h-1.5 w-1.5 fill-red-500 ml-2" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx={3} cy={3} r={3} />
            </svg>
          )}
        </span>
        <span className="text-xs">{submittedAt && convertSecondToDate(submittedAt.seconds).format('YYYY-MM-DD HH:mm')}</span>
      </td>
      {isLoading ? (
        <CellMeetingAttendanceTableColumnSkeleton />
      ) : (
        <>
          <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">
            <span>{attendanceList.length}</span>
          </td>
          <td className="h-full col-span-4 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
            {attendanceList.map(user => (
              <span key={user.userId}>{user.userName}</span>
            ))}
          </td>
          <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">
            <span>{absentList.length}</span>
          </td>
          <td className="h-full col-span-4 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">
            {absentList.map(user => (
              <span key={user.userId}>{user.userName}</span>
            ))}
          </td>
        </>
      )}
    </tr>
  );
};

export default CellMeetingAttendanceTableRow;
