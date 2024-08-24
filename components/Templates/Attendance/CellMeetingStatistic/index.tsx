import BlockContainer from "../../../Atoms/Container/BlockContainer";
import CellMeetingCellStaticSection from "../../../Organisms/Attendance/CellMeetingCellStaticSection";
import CellMeetingLastFourWeekStatic from "../../../Organisms/Attendance/CellMeetingLastFourWeekStatic";
import CellMeetingMonthlyStatic from "../../../Organisms/Attendance/CellMeetingMonthlyStatic";
import CellMeetingSeasonOverviewChart from "../../../Organisms/Attendance/CellMeetingSeasonOverviewChart";
import CellMeetingSeasonOverviewTable from "../../../Organisms/Attendance/CellMeetingSeasonOverviewTable";

const CellMeetingStatistic = () => {
  return (
    <>
      <BlockContainer firstBlock>
        <CellMeetingSeasonOverviewChart />
      </BlockContainer>
      <BlockContainer>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-4">
            <CellMeetingSeasonOverviewTable
              term={"2024"}
              termDisplay={"2024년"}
            />
          </div>
          <div className="col-span-4">
            <CellMeetingSeasonOverviewTable
              term={"2024FIRST"}
              termDisplay={"2024 상반기"}
            />
          </div>
          <div className="col-span-4">
            <CellMeetingSeasonOverviewTable
              term={"2024SECOND"}
              termDisplay={"2024 하반기"}
            />
          </div>
        </div>
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
      <BlockContainer>
        <CellMeetingCellStaticSection />
      </BlockContainer>
    </>
  );
};

export default CellMeetingStatistic;
