import useCommunity from "../../../../hooks/useCommunity";
import AttendanceTableRow from "./AttendanceTableRow";
import AttendanceTableHeader from "./AttendanceTableHeader";
import { Dayjs } from "dayjs";
import AttendanceTableRowSkeleton from "./AttendanceTableRowSkeleton";

type AttendnaceTableProps = {
  recentSunday: Dayjs
}

const AttendnaceTable = ({ recentSunday }: AttendnaceTableProps) => {
  const { isLoading, data, newFamily, blessing, renew } = useCommunity()

  return (
    <table className="relative min-w-full border border-gray-200">
      <AttendanceTableHeader />
      {isLoading ? (
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <AttendanceTableRowSkeleton key={index} />
          ))}
        </tbody>
      ) : (
        <>
          {data && newFamily && blessing && renew ? (
            <tbody className="divide-y divide-gray-200">
              {data.filter(community => community.communityName === "길")[0].cellList?.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                {data.filter(community => community.communityName === "진리")[0].cellList?.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                {data.filter(community => community.communityName === "생명")[0].cellList?.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                {data.filter(community => community.communityName === "빛")[0].cellList?.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                <AttendanceTableRow cell={newFamily} recentSunday={recentSunday}/>
                <AttendanceTableRow cell={blessing} recentSunday={recentSunday}/>
                <AttendanceTableRow cell={renew} recentSunday={recentSunday}/>
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200">
              <tr className="grid grid-cols-1 items-center text-center divide-x">
                <td className="h-full col-span-1 flex items-center justify-center text-base font-bold py-6">요청하신 데이터가 존재하지 않습니다</td>
              </tr>
            </tbody>
          )}
        </>
      )}
    </table>
  );
};

export default AttendnaceTable;
