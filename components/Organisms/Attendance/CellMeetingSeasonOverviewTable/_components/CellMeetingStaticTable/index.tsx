import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {TCellMeetingTermStatic} from "../../../../../../firebase/CellMeeting/CellMeetingStatic";

type Props = {
  termDisplay: string;
  data: TCellMeetingTermStatic;
};

const CellMeetingStaticTable = ({termDisplay, data}: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>{termDisplay} 통계</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell className="text-sm">평균 편성인원</TableCell>
          <TableCell className="text-sm text-right">
            {Math.ceil(data.totalAvg)}명
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">평균 출석인원</TableCell>
          <TableCell className="text-sm text-right">
            {Math.ceil(data.attendanceAvg)}명
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">평균 미참석인원</TableCell>
          <TableCell className="text-sm text-right">
            {Math.ceil(data.absentAvg)}명
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">평균 출석률</TableCell>
          <TableCell className="text-sm text-right">
            {data.attendanceRateAvg}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">최고 출석률</TableCell>
          <TableCell className="text-sm text-right">
            {data.highRate}% ({data.highRateDate})
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">최저 출석률</TableCell>
          <TableCell className="text-sm text-right">
            {data.lowRate}% ({data.lowRateDate})
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">최대 출석인원</TableCell>
          <TableCell className="text-sm text-right">
            {data.maxAttendance}명 ({data.maxAttendanceDate})
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm">최소 출석인원</TableCell>
          <TableCell className="text-sm text-right">
            {data.minAttendance}명 ({data.minAttendanceDate})
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CellMeetingStaticTable;
