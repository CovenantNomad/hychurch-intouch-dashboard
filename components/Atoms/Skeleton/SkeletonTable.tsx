interface SkeletonTableProps {}

const SkeletonTable = ({}: SkeletonTableProps) => {
  return (
    <div className="relative bg-white w-full flex flex-col items-center justify-center">
      <div className="bg-slate-200 w-full h-[48px] mb-4 rounded-lg shadow-sm animate-pulse" />
      <div className="bg-slate-200 w-full h-[40px] mb-2 rounded-lg shadow-sm animate-pulse" />
      <div className="bg-slate-200 w-full h-[40px] rounded-lg shadow-sm animate-pulse" />
    </div>
  );
};

export default SkeletonTable;
