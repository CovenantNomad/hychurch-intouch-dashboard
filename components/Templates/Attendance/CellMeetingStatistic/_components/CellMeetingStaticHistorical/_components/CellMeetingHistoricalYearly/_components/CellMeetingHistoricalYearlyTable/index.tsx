import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {TCellmeetingYearlyStatic} from "../../../../../../../../../../firebase/CellMeeting/CellMeetingStatic";

type Props = {
  data: TCellmeetingYearlyStatic[];
};

const CellMeetingHistoricalYearlyTable = ({data}: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-center">연도</TableHeaderCell>
          <TableHeaderCell className="text-center">총원</TableHeaderCell>
          <TableHeaderCell className="text-center">출석</TableHeaderCell>
          <TableHeaderCell className="text-center">미참석</TableHeaderCell>
          <TableHeaderCell className="text-center">출석률</TableHeaderCell>
          <TableHeaderCell className="text-center">최고 출석률</TableHeaderCell>
          <TableHeaderCell className="text-center">최저 출석률</TableHeaderCell>
          <TableHeaderCell className="text-center">
            최대 출석인원
          </TableHeaderCell>
          <TableHeaderCell className="text-center">
            최소 출석인원
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((year, index) => (
          <TableRow key={index}>
            <TableCell className="text-sm text-center">
              {year.termYear}
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.totalAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.attendanceAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.absentAvg}명
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.attendanceRateAvg}%
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.highRate}%<br />
              <span className="text-xs text-gray-500">
                ({year.highRateDate})
              </span>
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.lowRate}%<br />
              <span className="text-xs text-gray-500">
                ({year.lowRateDate})
              </span>
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.maxAttendance}명<br />
              <span className="text-xs text-gray-500">
                ({year.maxAttendanceDate})
              </span>
            </TableCell>
            <TableCell className="text-sm text-center">
              {year.minAttendance}명<br />
              <span className="text-xs text-gray-500">
                ({year.minAttendanceDate})
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CellMeetingHistoricalYearlyTable;
