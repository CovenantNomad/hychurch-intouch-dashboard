import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {TCellMeetingWeeklyStatic} from "../../../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {convertTerm} from "../../../../../../../../../../utils/utils";

type Props = {
  data: TCellMeetingWeeklyStatic[];
};

const CellMeetingHistoricalWeeklyTable = ({data}: Props) => {
  return (
    <Table className="table-fixed">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-center w-32">주간</TableHeaderCell>
          <TableHeaderCell className="text-center">총원</TableHeaderCell>
          <TableHeaderCell className="text-center">참석</TableHeaderCell>
          <TableHeaderCell className="text-center">미참석</TableHeaderCell>
          <TableHeaderCell className="text-center">출석률</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((week, index) => (
          <TableRow key={index}>
            <TableCell className="text-sm text-center font-semibold">
              {week.dateString} <br />
              <span className="text-xs font-normal">
                ({convertTerm(week.term)} -{" "}
                {String(week.weekOfTerm).padStart(2, "0")}주차)
              </span>
            </TableCell>
            <TableCell className="text-sm text-center">
              {week.total}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {week.attendance}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {week.absent}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {week.attendanceRate}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CellMeetingHistoricalWeeklyTable;
