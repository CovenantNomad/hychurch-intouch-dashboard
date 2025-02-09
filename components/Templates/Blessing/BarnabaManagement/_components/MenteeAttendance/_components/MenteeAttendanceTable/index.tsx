import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import {useQuery} from "react-query";
import {getMenteeAttendanceByDate} from "../../../../../../../../firebase/Barnabas/barnabas";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";

type Props = {
  recentSunday: dayjs.Dayjs;
};

const MenteeAttendanceTable = ({recentSunday}: Props) => {
  const {isLoading, isFetching, data, refetch} = useQuery(
    ["getMenteeAttendanceByDate", dayjs(recentSunday).format("YYYY-MM-DD")],
    () => getMenteeAttendanceByDate(dayjs(recentSunday).format("YYYY-MM-DD")),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <>
      <div className="mt-3 mb-1 flex justify-end">
        <button
          onClick={() => refetch()}
          className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
        >
          새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
      <div>
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : data && data.length !== 0 ? (
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-100 border border-gray-300 text-sm text-gray-600">
              <tr className="text-center divide-x divide-gray-300">
                <th className="h-12 w-[5%]">순번</th>
                <th className="h-12  w-[20%] cursor-pointer">바나바</th>
                <th className="h-12  w-[20%] cursor-pointer">멘티</th>
                <th className="h-12  w-[20%] cursor-pointer">예배출석</th>
                <th className="h-12 w-[35%] ">비고</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-300 border-b border-x border-gray-300">
              {data
                .slice()
                .sort((a, b) => a.barnabaName.localeCompare(b.barnabaName))
                .map((attendance, index) => (
                  <tr
                    key={index}
                    className="text-center divide-x divide-gray-300 hover:bg-gray-50"
                  >
                    <td className="h-10">{index + 1}</td>
                    <td className="h-10">{attendance.barnabaName}</td>
                    <td className="h-10">{attendance.menteeName}</td>
                    <td className="h-10">{attendance.service}</td>
                    <td className="h-10">{attendance.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="h-48 flex flex-col justify-center items-center space-y-2 border rounded-md">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="text-sm text-gray-500 text-center">
              이번주에 제출된 <br />
              멘티 출석체크 데이터가 없습니다.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MenteeAttendanceTable;
