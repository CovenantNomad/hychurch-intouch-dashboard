interface ActiveStaticProps {
  totalMembers: number;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeD: number;
}

const ActiveStatic = ({
  totalMembers,
  gradeA,
  gradeB,
  gradeC,
  gradeD,
}: ActiveStaticProps) => {
  return (
    <div className="h-full px-4">
      <div className="flex justify-between items-center py-2 border-b">
        <span className="inline-block text-sm text-gray-600">셀원총원</span>
        <span className="inline-block font-semibold">{totalMembers}명</span>
      </div>
      <div className="mt-4 border divide-y rounded-md">
        <div className="flex justify-between text-sm divide-x">
          <div className="flex-1 text-center py-1">A등급</div>
          <div className="flex-1 text-center py-1">B등급</div>
          <div className="flex-1 text-center py-1">C등급</div>
          <div className="flex-1 text-center py-1">D등급</div>
        </div>
        <div className="flex justify-between divide-x">
          <div className="flex-1 text-center py-2">{gradeA}명</div>
          <div className="flex-1 text-center py-2">{gradeB}명</div>
          <div className="flex-1 text-center py-2">{gradeC}명</div>
          <div className="flex-1 text-center py-2">{gradeD}명</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveStatic;
