import React from "react";

interface TableHeaderProps {}

const TableHeader = ({}: TableHeaderProps) => {
  return (
    <thead className="bg-white">
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          이름
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          성별
        </th>
        <th
          scope="col"
          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:block"
        >
          나이
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          생일
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          전화번호
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
