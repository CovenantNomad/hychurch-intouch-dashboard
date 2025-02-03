import {getMostRecentSunday} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import CellMeetingAttendanceCountTable from "../../../Organisms/Attendance/CellMeetingAttendanceCountTable";
import CellMeetingAttendanceTable from "../../../Organisms/Attendance/CellMeetingAttendanceTable";

type CellMeetingOverviewProps = {};

const CellMeetingOverview = ({}: CellMeetingOverviewProps) => {
  const recentSunday = getMostRecentSunday();

  return (
    <BlockContainer firstBlock>
      <div className="flex space-x-2 items-baseline mb-6">
        <h4 className="text-xl font-bold">이번주 셀모임 출석 명단</h4>
        <span className="text-sm">
          (조회일자: {recentSunday.format("YYYY-MM-DD")})
        </span>
      </div>
      <CellMeetingAttendanceTable recentSunday={recentSunday} />
      <CellMeetingAttendanceCountTable recentSunday={recentSunday} />
    </BlockContainer>
  );
};

export default CellMeetingOverview;
