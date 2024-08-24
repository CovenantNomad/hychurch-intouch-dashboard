import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {useQuery} from "react-query";
import {getCellMeetingYearOverviewStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";

type CellMeetingSeasonOverviewTableProps = {
  term: string;
  termDisplay: string;
};

const CellMeetingSeasonOverviewTable = ({
  term,
  termDisplay,
}: CellMeetingSeasonOverviewTableProps) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingYearOverviewStatics", term],
    () => getCellMeetingYearOverviewStatics(term),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="border">
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>{termDisplay} 전체통계</TableHeaderCell>
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
                  <TableCell className="text-sm">평균 결석인원</TableCell>
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
                  <TableCell className="text-sm">최대출석인원</TableCell>
                  <TableCell className="text-sm text-right">
                    {data.maxAttendance}명 ({data.maxAttendanceDate})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">최소출석인원</TableCell>
                  <TableCell className="text-sm text-right">
                    {data.minAttendance}명 ({data.minAttendanceDate})
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div className="h-[369px] flex justify-center items-center text-sm text-gray-500">
              No data
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CellMeetingSeasonOverviewTable;
