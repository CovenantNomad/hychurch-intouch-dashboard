import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {
  TCellMeetingTermStatic,
  TTermSpecificInfoMationResults,
} from "../../../../../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {convertTerm} from "../../../../../../../../../../utils/utils";

type Props = {
  data: TCellMeetingTermStatic[];
  info: TTermSpecificInfoMationResults[];
};

const CellMeetingHistoricalTermsTable = ({data, info}: Props) => {
  return (
    <Table className="table-fixed">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-center w-32">연도</TableHeaderCell>
          <TableHeaderCell className="text-center">총원</TableHeaderCell>
          <TableHeaderCell className="text-center">참석</TableHeaderCell>
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
        {data.map((term, index) => {
          // `info`에서 해당 term.term에 맞는 데이터 찾기
          const matchedInfo = info.find((item) => item.term === term.term);

          return (
            <TableRow key={index}>
              <TableCell className="text-sm text-center font-semibold">
                {convertTerm(term.term)} <br />
                {matchedInfo && (
                  <span className="text-xs text-gray-500 font-normal">
                    {" "}
                    ({matchedInfo.startDate} ~ {matchedInfo.endDate},{" "}
                    {matchedInfo.lengthOfWeek}주)
                  </span>
                )}
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.totalAvg}명
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.attendanceAvg}명
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.absentAvg}명
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.attendanceRateAvg}%
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.highRate}%<br />
                <span className="text-xs text-gray-500">
                  ({term.highRateDate})
                </span>
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.lowRate}%<br />
                <span className="text-xs text-gray-500">
                  ({term.lowRateDate})
                </span>
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.maxAttendance}명<br />
                <span className="text-xs text-gray-500">
                  ({term.maxAttendanceDate})
                </span>
              </TableCell>
              <TableCell className="text-sm text-center">
                {term.minAttendance}명<br />
                <span className="text-xs text-gray-500">
                  ({term.minAttendanceDate})
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CellMeetingHistoricalTermsTable;
