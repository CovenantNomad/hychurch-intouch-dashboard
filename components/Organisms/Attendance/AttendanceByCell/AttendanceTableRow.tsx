import { Dayjs } from "dayjs";
import useCellAttendance from "../../../../hooks/useCellAttendance";
import { CellListType } from "../../../../interface/cell";

type AttendanceByCellProps = {
  cell: CellListType
  recentSunday: Dayjs;
}

const AttendanceTableRow = ({ cell, recentSunday }: AttendanceByCellProps) => {
  const { isLoading, intouchAttendaceMember, secondAttendaceMember, thirdAttendaceMember, fourthAttendaceMember, missingMember } = useCellAttendance(cell.id, recentSunday)

  return (
    <tr className="grid grid-cols-24 items-center text-center divide-x">
      <td className="h-full col-span-2 flex items-center justify-center py-1">{cell.name}</td>
      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{secondAttendaceMember.length === 0 ? "" : secondAttendaceMember.length}</td>
      <td className="h-full col-span-1 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{secondAttendaceMember.map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>

      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{thirdAttendaceMember.filter(user => !user.isOnline).length === 0 ? "" : thirdAttendaceMember.filter(user => !user.isOnline).length}</td>
      <td className="h-full col-span-1 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{thirdAttendaceMember.filter(user => !user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>
      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{thirdAttendaceMember.filter(user => user.isOnline).length === 0 ? "" : thirdAttendaceMember.filter(user => user.isOnline).length}</td>
      <td className="h-full col-span-1 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{thirdAttendaceMember.filter(user => user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>

      <td className="h-full col-span-1 flex items-center justify-center text-sm">{fourthAttendaceMember.filter(user => !user.isOnline).length === 0 ? "" : fourthAttendaceMember.filter(user => !user.isOnline).length}</td>
      <td className="h-full col-span-3 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{fourthAttendaceMember.filter(user => !user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>
      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{fourthAttendaceMember.filter(user => user.isOnline).length === 0 ? "" : fourthAttendaceMember.filter(user => user.isOnline).length}</td>
      <td className="h-full col-span-2 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{fourthAttendaceMember.filter(user => user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>

      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{intouchAttendaceMember.filter(user => !user.isOnline).length === 0 ? "" : intouchAttendaceMember.filter(user => !user.isOnline).length}</td>
      <td className="h-full col-span-4 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{intouchAttendaceMember.filter(user => !user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>
      <td className="h-full col-span-1 flex items-center justify-center text-sm py-1">{intouchAttendaceMember.filter(user => user.isOnline).length === 0 ? "" : intouchAttendaceMember.filter(user => user.isOnline).length}</td>
      <td className="h-full col-span-3 flex flex-wrap justify-start items-center gap-x-2 gap-y-1 px-2 text-sm py-1">{intouchAttendaceMember.filter(user => user.isOnline).map(user => (
        <span key={user.id}>{user.name}</span>
      ))}
      </td>
    </tr>
  );
};

export default AttendanceTableRow;
