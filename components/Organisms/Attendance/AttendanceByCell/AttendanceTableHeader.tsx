type AttendanceTableHeaderProps = {}

const AttendanceTableHeader = ({}: AttendanceTableHeaderProps) => {
  return (
    <thead className="">
      <tr className="grid grid-rows-2 grid-cols-24 divide-x divide-y border-b bg-gray-100">
        <th className="row-span-2 col-span-2 self-center py-1 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0">
          셀이름
        </th>
        <th className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          2부(8:00)
        </th>
        <th colSpan={4} className="row-span-1 col-span-4 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          3부(9:30)
        </th>
        <th colSpan={7} className="row-span-1 col-span-7 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          4부(11:30)
        </th>
        <th colSpan={9} className="row-span-1 col-span-9 py-1 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0">
          인터치(2:15)
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 border-l px-3 py-1 text-center text-sm font-semibold text-gray-900">
          인원
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={2} className="row-span-1 col-span-2 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          성전
        </th>
        <th colSpan={4} className="row-span-1 col-span-4 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          명단
        </th>
        <th colSpan={1} className="row-span-1 col-span-1 px-3 py-1 text-center text-sm font-semibold text-gray-900">
          온라인
        </th>
        <th colSpan={3} className="row-span-1 col-span-3 py-1 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-0">
          명단
        </th>
      </tr>
    </thead>
  );
};

export default AttendanceTableHeader;
