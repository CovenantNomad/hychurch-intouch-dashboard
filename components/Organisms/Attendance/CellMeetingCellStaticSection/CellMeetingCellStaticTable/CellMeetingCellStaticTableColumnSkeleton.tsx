import React from 'react';

type CellMeetingCellStaticTableColumnSkeletonProps = {}

const CellMeetingCellStaticTableColumnSkeleton = ({}: CellMeetingCellStaticTableColumnSkeletonProps) => {
  return (
    <>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-6 h-2 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-6 h-2 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-6 h-2 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-2 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-6 h-2 rounded-2xl bg-slate-200"></span>
      </td>
    </>
  );
};

export default CellMeetingCellStaticTableColumnSkeleton;
