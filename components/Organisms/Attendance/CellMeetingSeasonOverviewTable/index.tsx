import React from 'react';
import { useQuery } from 'react-query';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { getCellMeetingSeasonOverviewStatics } from '../../../../firebase/CellMeeting/CellMeetingStatic';

type CellMeetingSeasonOverviewTableProps = {}

const CellMeetingSeasonOverviewTable = ({}: CellMeetingSeasonOverviewTableProps) => {

  const { isLoading, isFetching, data } = useQuery(
    ['getCellMeetingSeasonOverviewStatics', '2024FIRST'], 
    () => getCellMeetingSeasonOverviewStatics('2024FIRST'),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  return (
    <div className='border'>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>2024 상반기 전체통계</TableHeaderCell>
                </TableRow>
              </TableHead>
      
              <TableBody>
                <TableRow>
                  <TableCell className="text-sm">평균 편성인원</TableCell>
                  <TableCell className="text-sm text-right">{Math.ceil(data.totalAvg)}명</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">평균 출석인원</TableCell>
                  <TableCell className="text-sm text-right">{Math.ceil(data.attendanceAvg)}명</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">평균 결석인원</TableCell>
                  <TableCell className="text-sm text-right">{Math.ceil(data.absentAvg)}명</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">평균 출석률</TableCell>
                  <TableCell className="text-sm text-right">{data.attendanceRateAvg}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">최대출석인원</TableCell>
                  <TableCell className="text-sm text-right">{data.maxAttendance}명 ({data.maxAttendanceDate})</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">최소출석인원</TableCell>
                  <TableCell className="text-sm text-right">{data.minAttendance}명 ({data.minAttendanceDate})</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div>
              데이터가 없습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CellMeetingSeasonOverviewTable;
