import { Dayjs } from "dayjs";
import AttendanceCountTableHeader from "./AttendanceCountTableHeader";
import AttendanceCountTableRow from "./AttendanceCountTableRow";

type AttendanceCountTableProps = {
  recentSunday: Dayjs
}

const AttendanceCountTable = ({ recentSunday }: AttendanceCountTableProps) => {

  return (
    <table className="min-w-full border border-gray-200">
      <AttendanceCountTableHeader />
      <AttendanceCountTableRow recentSunday={recentSunday} />
    </table>
  );
};

export default AttendanceCountTable;
