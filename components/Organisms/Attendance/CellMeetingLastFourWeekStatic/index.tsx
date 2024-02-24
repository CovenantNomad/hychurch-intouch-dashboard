import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import React from 'react';
import { useQuery } from 'react-query';
import { getCellMeetingLastFourWeekStatics } from '../../../../firebase/CellMeeting/CellMeetingStatic';

type CellMeetingLastFourWeekStaticProps = {}

const CellMeetingLastFourWeekStatic = ({}: CellMeetingLastFourWeekStaticProps) => {

  const { isLoading, isFetching, data } = useQuery(
    ['getCellMeetingLastFourWeekStatics'], 
    () => getCellMeetingLastFourWeekStatics(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  )

  return (
    <div className='border'>
      <h3 className='font-semibold text-tremor-content px-4 py-3.5'>최근 5주간 셀모임 통계</h3>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell className='text-center'>날짜</TableHeaderCell>
                  <TableHeaderCell className='text-center'>총원</TableHeaderCell>
                  <TableHeaderCell className='text-center'>출석</TableHeaderCell>
                  <TableHeaderCell className='text-center'>결석</TableHeaderCell>
                  <TableHeaderCell className='text-center'>출석률</TableHeaderCell>
                </TableRow>
              </TableHead>
      
              <TableBody>
                {data.map((week, index) => (
                  <TableRow key={index}>
                    <TableCell className='text-sm text-center'>{week.date}</TableCell>
                    <TableCell className='text-sm text-center'>{week.total}명</TableCell>
                    <TableCell className='text-sm text-center'>{week.attendance}명</TableCell>
                    <TableCell className='text-sm text-center'>{week.absent}명</TableCell>
                    <TableCell className='text-sm text-center'>{week.attendanceRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </>
      )}
    </div>
  );
};

export default CellMeetingLastFourWeekStatic;
