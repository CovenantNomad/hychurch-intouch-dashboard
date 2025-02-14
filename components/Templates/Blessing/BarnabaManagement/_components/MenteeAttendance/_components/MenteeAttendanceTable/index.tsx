import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import {useBarnabasCourseWithAttendance} from "../../../../../../../../hooks/barnabas/useBarnabasCourseWithAttendance";
import SkeletonTable from "../../../../../../../Atoms/Skeleton/SkeletonTable";

type Props = {
  recentSunday: dayjs.Dayjs;
};

const MenteeAttendanceTable = ({recentSunday}: Props) => {
  const {isLoading, isFetching, data, refetch} =
    useBarnabasCourseWithAttendance({
      recentSunday,
    });

  return (
    <>
      <div className="flex justify-end items-center mt-3 mb-1">
        {isFetching && (
          <span className="animate-pulse text-sm mr-4">새로고침 중..</span>
        )}
        <button
          onClick={() => refetch()}
          className="flex items-center text-sm hover:bg-gray-100 py-2 px-3 rounded-md"
        >
          새로고침 <ArrowPathIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
      <div>
        {isLoading ? (
          <SkeletonTable />
        ) : data && data.length !== 0 ? (
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-100 border border-gray-300 text-sm text-gray-600">
              <tr className="text-center divide-x divide-gray-300">
                <th className="h-10 w-[5%]">순번</th>
                <th className="h-10 w-[20%] cursor-pointer">바나바</th>
                <th className="h-10 w-[20%] cursor-pointer">멘티</th>
                <th className="h-10 w-[20%] cursor-pointer">예배출석</th>
                <th className="h-10 w-[35%] ">비고</th>
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
                    <td className="h-12 text-sm">{index + 1}</td>
                    <td className="h-12 text-sm">{attendance.barnabaName}</td>
                    <td className="h-12 text-sm">{attendance.menteeName}</td>
                    <td
                      className={`h-12 text-sm ${
                        attendance.service === "미제출" && "text-rose-500"
                      }`}
                    >
                      {attendance.service}
                    </td>
                    <td className="h-12 text-sm px-4">
                      {attendance.description}
                    </td>
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
