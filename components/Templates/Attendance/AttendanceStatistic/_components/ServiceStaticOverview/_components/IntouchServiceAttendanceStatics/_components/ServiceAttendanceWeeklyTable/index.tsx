import {TServiceAttendanceWeekly} from "../../../../../../../../../../interface/attendance";

type Props = {
  data: TServiceAttendanceWeekly[];
};

const ServiceAttendanceWeeklyTable = ({data}: Props) => {
  return (
    <table className="table-auto border-collapse border w-full text-sm">
      <thead>
        {/* 상단 헤더 */}
        <tr className="divide-x border-b bg-gray-100">
          {/* 날짜 */}
          <th
            rowSpan={2}
            className="w-28 px-3 py-2 text-center text-sm font-semibold text-gray-900 bg-gray-100 border"
          >
            날짜
          </th>
          {/* 1부 ~ 전체 예배 */}
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            1부예배 (7:00)
          </th>
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            2부예배 (8:00)
          </th>
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            3부예배 (9:30)
          </th>
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            4부예배 (11:30)
          </th>
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            인터치예배 (2:15)
          </th>
          <th
            colSpan={3}
            className="px-3 py-2 text-center text-sm font-semibold text-gray-900"
          >
            전체
          </th>
        </tr>

        {/* 하단 헤더 */}
        <tr className="divide-x border-b bg-gray-100">
          {Array(6)
            .fill(0)
            .flatMap(() => [
              <th
                key="성전"
                className="w-20 px-3 py-2 text-center text-xs font-medium text-gray-700"
              >
                성전
              </th>,
              <th
                key="온라인"
                className="w-20 px-3 py-2 text-center text-xs font-medium text-gray-700"
              >
                온라인
              </th>,
              <th
                key="전체"
                className="w-20 px-3 py-2 text-center text-xs font-medium text-gray-700 bg-amber-50"
              >
                전체
              </th>,
            ])}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {data.map((week, index) => (
          <tr key={index} className="divide-x text-center">
            {/* 날짜 */}
            <td className="w-28 px-3 py-2 text-center text-sm font-medium text-gray-900 bg-gray-50">
              {week.dateString}
            </td>

            {/* 1부 예배 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.firstOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.firstOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.firstTotal}
            </td>

            {/* 2부 예배 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.secondOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.secondOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.secondTotal}
            </td>

            {/* 3부 예배 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.thirdOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.thirdOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.thirdTotal}
            </td>

            {/* 4부 예배 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.fourthOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.fourthOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.fourthTotal}
            </td>

            {/* 인터치 예배 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.fifthOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.fifthOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.fifthTotal}
            </td>

            {/* 전체 */}
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.totalOff}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700">
              {week.totalOnline}
            </td>
            <td className="w-20 px-3 py-2 text-sm text-gray-700 bg-amber-50">
              {week.total}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceAttendanceWeeklyTable;
