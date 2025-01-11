import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {useQuery} from "react-query";
import {getCellMeetingLastFourWeekStatics} from "../../../../firebase/CellMeeting/CellMeetingStatic";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";

type CellMeetingLastFourWeekStaticProps = {};

const CellMeetingLastFourWeekStatic =
  ({}: CellMeetingLastFourWeekStaticProps) => {
    const {isLoading, isFetching, data} = useQuery(
      ["getCellMeetingLastFourWeekStatics"],
      () => getCellMeetingLastFourWeekStatics(),
      {
        staleTime: 10 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
      }
    );

    return (
      <div className="border">
        <h3 className="font-semibold text-tremor-content px-4 py-3.5">
          최근 5주간 셀모임 통계
        </h3>
        {isLoading || isFetching ? (
          <div className="px-4">
            <Skeleton className="w-full h-[318px]" />
          </div>
        ) : (
          <>
            {data ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell className="text-center">
                      날짜
                    </TableHeaderCell>
                    <TableHeaderCell className="text-center">
                      총원
                    </TableHeaderCell>
                    <TableHeaderCell className="text-center">
                      출석
                    </TableHeaderCell>
                    <TableHeaderCell className="text-center">
                      미참석
                    </TableHeaderCell>
                    <TableHeaderCell className="text-center">
                      출석률
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.map((week, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm text-center">
                        {week.date}
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
            ) : (
              <div className="h-[318px] flex flex-col justify-center items-center">
                <ExclamationTriangleIcon className="h-6 w-6" />
                <span className="block text-sm text-gray-600 mt-1">
                  월별 셀모임 통계를 조회하지 못했습니다.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

export default CellMeetingLastFourWeekStatic;
