import useCommunity from "../../../../hooks/useCommunity";
import AttendanceTableRow from "./AttendanceTableRow";
import AttendanceTableHeader from "./AttendanceTableHeader";
import { Dayjs } from "dayjs";
import Spinner from "../../../Atoms/Spinner";
import AttendanceTableRowSkeleton from "./AttendanceTableRowSkeleton";

type AttendnaceTableProps = {
  recentSunday: Dayjs
}

const AttendnaceTable = ({ recentSunday }: AttendnaceTableProps) => {
  const { isLoading, data, newFamily, blessing } = useCommunity()

  return (
    // <>
    //   {isLoading ? (
    //     <div className="py-10">
    //       <Spinner />
    //     </div>
    //   ) : (
    //     <>
    //       {data && newFamily && blessing ? (
    //         <table className="relative min-w-full border border-gray-200">
    //           <AttendanceTableHeader />
    //           <tbody className="divide-y divide-gray-200">
    //             {data.filter(community => community.communityName === "길")[0].cellList?.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //             {data.filter(community => community.communityName === "진리")[0].cellList?.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //             {data.filter(community => community.communityName === "생명")[0].cellList?.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //             {data.filter(community => community.communityName === "빛")[0].cellList?.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //             {newFamily.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //             {blessing.map(cell => (
    //               <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
    //             ))}
    //           </tbody>
    //         </table>
    //       ) : (
    //         <div>데이터 없어요</div>
    //       )}
    //     </>
    //   )}
    // </>
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
          {data && newFamily && blessing ? (
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
                {newFamily.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
                {blessing.map(cell => (
                  <AttendanceTableRow key={cell.id} cell={cell} recentSunday={recentSunday}/>
                ))}
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
