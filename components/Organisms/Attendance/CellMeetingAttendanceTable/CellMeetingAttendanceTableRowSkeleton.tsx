
const CellMeetingAttendanceTableRowSkeleton = () => {
  return (
    <tr className="grid grid-cols-12 items-center text-center divide-x">
      <td className="h-full col-span-3 flex items-center justify-left py-4 px-5">
        <span className="animate-pulse inline-block w-12 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-5 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-32 h-3 rounded-2xl bg-slate-200"></span>
      </td>
      <td className="h-full col-span-4 flex items-center justify-center text-sm py-4">
        <span className="animate-pulse inline-block w-16 h-3 rounded-2xl bg-slate-200"></span>
      </td>
    </tr>
  );
};

export default CellMeetingAttendanceTableRowSkeleton;
