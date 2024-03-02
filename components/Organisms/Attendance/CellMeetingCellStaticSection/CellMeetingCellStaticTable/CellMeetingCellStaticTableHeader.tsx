import React from 'react';

type CellMeetingCellStaticTableHeaderProps = {}

const CellMeetingCellStaticTableHeader = ({}: CellMeetingCellStaticTableHeaderProps) => {
  return (
    <thead>
      <tr className="grid grid-cols-12 divide-x border-b bg-gray-100">
        <th className="col-span-4 py-2 px-3 text-center text-sm font-semibold text-gray-900 ">
          셀이름
        </th>
        <th className="col-span-2 py-2 px-3 text-center text-sm font-semibold text-gray-900">
          평균출석인원
        </th>
        <th className="col-span-2 py-2 px-3 text-center text-sm font-semibold text-gray-900">
          평균미참석인원
        </th>
        <th className="col-span-2 py-2 px-3 text-center text-sm font-semibold text-gray-900">
          평균전체인원
        </th>
        <th className="col-span-2 py-2 px-3 text-center text-sm font-semibold text-gray-900">
          평균출석률
        </th>
      </tr>
    </thead>
  );
};

export default CellMeetingCellStaticTableHeader;
