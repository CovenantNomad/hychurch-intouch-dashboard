import {FindCellQuery, UserGrade} from "../../../graphql/generated";
// components
import groupBy from "../../../lib/groupBy";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import SectionContainer from "../../Atoms/Container/SectionContainer";
import EmptyStateSimple from "../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonChart from "../../Atoms/Skeleton/SkeletonChart";
import SkeletonStatic from "../../Atoms/Skeleton/SkeletonStatic";
import SkeletonTable from "../../Atoms/Skeleton/SkeletonTable";
import CellMemberList from "../../Organisms/Cells/CellInfomation/_components/CellMemberList";
import ActiveStatic from "../../Organisms/Cells/CellInfomation/ActiveStatic";
import AgeStatic from "../../Organisms/Cells/CellInfomation/AgeStatic";
import GenderStatic from "../../Organisms/Cells/CellInfomation/GenderStatic";

interface CellInfomationScreenProps {
  isLoading: boolean;
  data: FindCellQuery | undefined;
}

const CellInfomationScreen = ({isLoading, data}: CellInfomationScreenProps) => {
  return (
    <SectionContainer>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <div className="col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-white rounded-md">
          <p className="pb-4 tracking-wide">활동등급</p>
          {isLoading ? (
            <SkeletonStatic />
          ) : data ? (
            <ActiveStatic
              totalMembers={data?.findCell.statistics.totalCountOfMembers}
              gradeA={
                data?.findCell.members.filter(
                  (member) => member.grade === UserGrade.A
                ).length || 0
              }
              gradeB={
                data?.findCell.members.filter(
                  (member) => member.grade === UserGrade.B
                ).length || 0
              }
              gradeC={
                data?.findCell.members.filter(
                  (member) => member.grade === UserGrade.C
                ).length || 0
              }
              gradeD={
                data?.findCell.members.filter(
                  (member) => member.grade === UserGrade.D
                ).length || 0
              }
            />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
        <div className="col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-white flex flex-col rounded-md">
          <h4 className="pb-4 tracking-wide">성별 구성</h4>
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
        <div className="shadow-sm col-span-1 sm:col-span-2 pt-4 pb-2 px-2 border border-slate-200 bg-white rounded-md flex flex-col">
          <h4 className="pb-4 tracking-wide">연령별 구성</h4>
          {isLoading ? (
            <SkeletonChart />
          ) : data ? (
            <AgeStatic data={groupBy(data.findCell.members)} />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>

      <BlockContainer>
        <h6 className="text-lg font-bold text-gray-900 pb-5">셀편성 명단</h6>
        <div>
          {isLoading ? (
            <SkeletonTable />
          ) : data ? (
            <CellMemberList members={data.findCell.members} />
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </BlockContainer>
    </SectionContainer>
  );
};

export default CellInfomationScreen;
