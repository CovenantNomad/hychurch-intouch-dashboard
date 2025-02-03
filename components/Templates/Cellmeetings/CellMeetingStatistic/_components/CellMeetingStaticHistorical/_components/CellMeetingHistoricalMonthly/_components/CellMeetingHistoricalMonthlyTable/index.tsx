import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {TCellmeetingMonthlyStatic} from "../../../../../../../../../../firebase/CellMeeting/CellMeetingStatic";

type Props = {
  data: TCellmeetingMonthlyStatic[];
};

const CellMeetingHistoricalMonthlyTable = ({data}: Props) => {
  return (
    <Table className="table-fixed">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-center w-32">월간</TableHeaderCell>
          <TableHeaderCell className="text-center">총원</TableHeaderCell>
          <TableHeaderCell className="text-center">참석</TableHeaderCell>
          <TableHeaderCell className="text-center">미참석</TableHeaderCell>
          <TableHeaderCell className="text-center">출석률</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((month, index) => (
          <TableRow key={index}>
            <TableCell className="text-sm text-center font-semibold">
              {month.dateString.replace("-", "년 ") + "월"}
            </TableCell>
            <TableCell className="text-sm text-center">
              {month.totalAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {month.attendanceAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {month.absentAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {String(month.attendanceRate.toFixed(2)).padEnd(2, "0")}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CellMeetingHistoricalMonthlyTable;
