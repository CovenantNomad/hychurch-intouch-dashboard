import React from 'react';

type CellMeetingCellStaticTableRowSkeletonProps = {}

const CellMeetingCellStaticTableRowSkeleton = ({}: CellMeetingCellStaticTableRowSkeletonProps) => {
  return (
    <tr className="grid grid-cols-12 items-center text-center divide-x">
      <td className="h-full col-span-4 flex items-center justify-left py-4 px-5">
        <span className="animate-pulse inline-block w-32 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center py-4 px-5">
        <span className="animate-pulse inline-block w-12 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-12 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-12 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center py-4 px-5">
        <span className="animate-pulse inline-block w-12 h-3 rounded-2xl bg-slate-200"></span>
      </td>
    </tr>
  );
};

export default CellMeetingCellStaticTableRowSkeleton;
