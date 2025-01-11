import BlockContainer from "../../../../../Atoms/Container/BlockContainer";
import CellMeetingLastFourWeekStatic from "../../../../../Organisms/Attendance/CellMeetingLastFourWeekStatic";
import CellMeetingMonthlyStatic from "../../../../../Organisms/Attendance/CellMeetingMonthlyStatic";
import CellMeetingSeasonOverviewChart from "../../../../../Organisms/Attendance/CellMeetingSeasonOverviewChart";
import CellMeetingSeasonOverviewTable from "../../../../../Organisms/Attendance/CellMeetingSeasonOverviewTable";
import CellMeetingLastWeek from "../../../../../Organisms/CellMeeting/CellMeetingLastWeek";

type Props = {};

const CellMeetingStaticOverview = ({}: Props) => {
  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <CellMeetingLastWeek />
      </div>
      <BlockContainer>
        <CellMeetingSeasonOverviewChart />
      </BlockContainer>
      <BlockContainer>
        <CellMeetingSeasonOverviewTable />
      </BlockContainer>
      <BlockContainer>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-3">
            <CellMeetingLastFourWeekStatic />
          </div>
          <div className="col-span-9">
            <CellMeetingMonthlyStatic />
          </div>
        </div>
      </BlockContainer>
    </>
  );
};

export default CellMeetingStaticOverview;
