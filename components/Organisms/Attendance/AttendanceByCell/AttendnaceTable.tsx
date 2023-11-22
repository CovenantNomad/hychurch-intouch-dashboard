import useCommunity from "../../../../hooks/useCommunity";
import { getMostRecentSunday } from "../../../../utils/dateUtils";
import AttendanceTableRow from "./AttendanceTableRow";
import AttendanceTableHeader from "./AttendanceTableHeader";

type AttendnaceTableProps = {}

const AttendnaceTable = ({}: AttendnaceTableProps) => {
  const recentSunday = getMostRecentSunday();
  const { isLoading, data, newFamily, blessing } = useCommunity()

  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          {data && newFamily && blessing ? (
            <table className="min-w-full border border-gray-200">
              <AttendanceTableHeader />
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
            </table>
          ) : (
            <div>데이터 없어요</div>
          )}
        </>
      )}
    </>
  );
};

export default AttendnaceTable;



// {isLoading ? (
//   <div>로딩중...</div>
// ) : (
//   <>
//     {data && newFamily && blessing ? (
//       <div>
//         {data.filter(community => community.communityName === "길")[0].cellList?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//         {data.filter(community => community.communityName === "진리")[0].cellList?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//         {data.filter(community => community.communityName === "생명")[0].cellList?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//         {data.filter(community => community.communityName === "빛")[0].cellList?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//         {newFamily?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//         {blessing?.map(cell => (
//           <AttendanceByCell key={cell.id} cell={cell} recentSunday={recentSunday}/>
//         ))}
//       </div>
//     ) : (
//       <div>데이터가 없어요.</div>
//     )}
//   </>
// )}
