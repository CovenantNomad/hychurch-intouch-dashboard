import BlockContainer from "../../../Atoms/Container/BlockContainer";
import CellMeetingAttendanceTable from "../../../Organisms/Attendance/CellMeetingAttendanceTable";
import CellMeetingAttendanceCountTable from "../../../Organisms/Attendance/CellMeetingAttendanceCountTable";
import { getMostRecentSunday } from "../../../../utils/dateUtils";

type CellMeetingOverviewProps = {}

const CellMeetingOverview = ({}: CellMeetingOverviewProps) => {
  const recentSunday = getMostRecentSunday();

  return (
    <BlockContainer firstBlock>
      <CellMeetingAttendanceTable recentSunday={recentSunday} />
      <CellMeetingAttendanceCountTable recentSunday={recentSunday} />
    </BlockContainer>
  );
};

export default CellMeetingOverview;
