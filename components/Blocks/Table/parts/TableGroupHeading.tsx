import React from "react";

interface TableGroupHeadingProps {
  name: string;
}

const TableGroupHeading = ({ name }: TableGroupHeadingProps) => {
  return (
    <tr className="border-t border-gray-200">
      <th
        colSpan={5}
        scope="colgroup"
        className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 sm:px-6"
      >
        {name}
      </th>
    </tr>
  );
};

export default TableGroupHeading;
