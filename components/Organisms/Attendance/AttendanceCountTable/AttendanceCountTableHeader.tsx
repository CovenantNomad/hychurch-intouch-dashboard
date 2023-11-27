type AttendanceCountTableHeaderProps = {}

const AttendanceCountTableHeader = ({}: AttendanceCountTableHeaderProps) => {
  return (
    <thead>
      <tr className="grid grid-rows-2 grid-cols-24 divide-x divide-y border-b bg-gray-100">
        <th colSpan={6} className="row-span-1 col-span-6 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          2부(8:00)
        </th>
        <th colSpan={6} className="row-span-1 col-span-6 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          3부(9:30)
        </th>
        <th colSpan={6} className="row-span-1 col-span-6 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          4부(11:30)
        </th>
        <th colSpan={6} className="row-span-1 col-span-6 py-1 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0">
          인터치(2:15)
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 border-l px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
      </tr>
    </thead>
  );
};

export default AttendanceCountTableHeader;
