import { Dayjs } from "dayjs";
import { FindThisWeekServicesCountQuery, FindThisWeekServicesCountQueryVariables, useFindThisWeekServicesCountQuery } from "../../../../graphql/generated";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";

type AttendanceCountTableRowProps = {
  recentSunday: Dayjs
}

const AttendanceCountTableRow = ({ recentSunday }: AttendanceCountTableRowProps) => {
  const { isLoading, isFetching, data } = useFindThisWeekServicesCountQuery<
    FindThisWeekServicesCountQuery,
    FindThisWeekServicesCountQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: recentSunday.format('YYYY-MM-DD'),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <>
      {isLoading || isFetching ? (
        <tbody>
          <tr className="grid grid-cols-24 items-center text-center divide-x">
            {Array.from({length: 8}).map((_, index) => (
              <td key={index} className="h-full col-span-3 flex items-center justify-center py-3">
                <span className="animate-pulse inline-block w-8 h-2 rounded-2xl bg-slate-200"></span>
              </td>
            ))}
          </tr>
        </tbody>
      ) : (
        <>
          {data ? (
            <tbody className="divide-y divide-gray-200">
              <tr className="grid grid-cols-24 items-center text-center divide-x">
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '2' && !item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '2' && !item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '2' && item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '2' && item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '3' && !item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '3' && !item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '3' && item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '3' && item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '4' && !item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '4' && !item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '4' && item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '4' && item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '5' && !item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '5' && !item.isOnline)?.totalCount : '0'}
                </td>
                <td className="h-full col-span-3 flex items-center justify-center text-sm py-2">
                  {data.churchServiceAttendanceStats.find(item => item.churchService.id === '5' && item.isOnline) ? data.churchServiceAttendanceStats.find(item => item.churchService.id === '5' && item.isOnline)?.totalCount : '0'}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200">
              <tr className="grid grid-cols-1 items-center text-center divide-x">
                <td className="h-full col-span-1 flex items-center justify-center text-base font-bold py-4">요청하신 데이터가 존재하지 않습니다</td>
              </tr>
            </tbody>
          )}
        </>
      )}
    </>
  );
};

export default AttendanceCountTableRow;
