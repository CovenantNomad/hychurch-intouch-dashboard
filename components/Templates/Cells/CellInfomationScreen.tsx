import { FindCellQuery } from "../../../graphql/generated";
// components
import EmptyStateSimple from "../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonChart from "../../Atoms/Skeleton/SkeletonChart";
import SkeletonStatic from "../../Atoms/Skeleton/SkeletonStatic";
import GenderStatic from "../../Organisms/Cells/CellInfomation/GenderStatic";
import AgeStatic from "../../Organisms/Cells/CellInfomation/AgeStatic";
import groupBy from "../../../lib/groupBy";
import Table from "../../Blocks/Table/Table";
import SkeletonTable from "../../Atoms/Skeleton/SkeletonTable";
import ActiveStatic from "../../Organisms/Cells/CellInfomation/ActiveStatic";

interface CellInfomationScreenProps {
  isLoading: boolean;
  data: FindCellQuery | undefined;
}

const CellInfomationScreen = ({
  isLoading,
  data,
}: CellInfomationScreenProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2 xl:grid-cols-4 ">
        <div className="col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-white">
          <h4 className="font-light pb-4 tracking-wide">셀원 통계</h4>
          {isLoading ? (
            <SkeletonStatic />
          ) : data ? (
            <ActiveStatic
              totalMembers={data?.findCell.statistics.totalCountOfMembers}
              activceMembers={data?.findCell.statistics.countOfActiveMembers}
            />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
        <div className="col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-white flex flex-col">
          <h4 className="font-light pb-4 tracking-wide">성별 구성</h4>
          {isLoading ? (
            <SkeletonChart />
          ) : data ? (
            <GenderStatic
              maleMembers={
                data.findCell.members.filter(
                  (member) => member.gender === "MAN"
                ).length
              }
              femaleMembers={
                data.findCell.members.filter(
                  (member) => member.gender === "WOMAN"
                ).length
              }
            />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
        <div className="shadow-sm col-span-1 sm:col-span-2 pt-4 pb-2 px-2 border border-slate-200 bg-white flex flex-col">
          <h4 className="font-light pb-4 tracking-wide">연령별 구성</h4>
          {isLoading ? (
            <SkeletonChart />
          ) : data ? (
            <AgeStatic data={groupBy(data.findCell.members)} />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-12">
        <div className="shadow-sm xl:col-span-3 pt-4 pb-2 px-2 border border-slate-200 bg-gray-100 flex flex-col">
          <h4 className="text-lg font-bold pb-4">전체 출석 동향</h4>
          <div className="relative bg-white rounded-md h-full">
            {/* 셀전체 출석 그래프 - Bar+Line */}
          </div>
        </div>
        <div className="shadow-sm xl:col-span-1 pt-4 pb-2 px-2 border border-slate-200 bg-gray-100 flex flex-col">
          <h4 className="text-lg font-bold pb-4">셀원별 출석 동향</h4>
          <div className="relative bg-white rounded-md h-full">
            {/* 셀원별 출석 그래프 - 잔디형, 4주치 */}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900">셀원 리스트</h2>
        <div className="mt-8">
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <Table members={data?.findCell.members} />
          )}
        </div>
      </section>
    </div>
  );
};

export default CellInfomationScreen;
