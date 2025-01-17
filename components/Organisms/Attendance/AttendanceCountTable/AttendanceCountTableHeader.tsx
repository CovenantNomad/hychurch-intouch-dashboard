type AttendanceCountTableHeaderProps = {};

const AttendanceCountTableHeader = ({}: AttendanceCountTableHeaderProps) => {
  return (
    <thead>
      <tr className="grid grid-rows-2 grid-cols-10 divide-x divide-y border-b bg-gray-100">
        <th
          colSpan={2}
          className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          1부예배 (7:00)
        </th>
        <th
          colSpan={2}
          className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          2부예배 (8:00)
        </th>
        <th
          colSpan={2}
          className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          3부예배 (9:30)
        </th>
        <th
          colSpan={2}
          className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          4부예배 (11:30)
        </th>
        <th
          colSpan={2}
          className="row-span-1 col-span-2 py-1 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0"
        >
          인터치예배 (2:15)
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 border-l px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          성전
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          온라인
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 border-l px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          성전
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          온라인
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          성전
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          온라인
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          성전
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          온라인
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          성전
        </th>
        <th
          colSpan={1}
          className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900"
        >
          온라인
        </th>
      </tr>
    </thead>
  );
};

export default AttendanceCountTableHeader;
