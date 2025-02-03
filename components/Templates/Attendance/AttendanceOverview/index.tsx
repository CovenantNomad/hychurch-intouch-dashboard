import {getMostRecentSunday} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AttendnaceTable from "../../../Organisms/Attendance/AttendanceByCell/AttendnaceTable";
import AttendanceCountTable from "../../../Organisms/Attendance/AttendanceCountTable/AttendanceCountTable";

type AttendanceOverviewProps = {};

const AttendanceOverview = ({}: AttendanceOverviewProps) => {
  const recentSunday = getMostRecentSunday();

  return (
    <BlockContainer firstBlock>
      <div className="flex space-x-2 items-baseline mb-6">
        <h4 className="text-xl font-bold">이번주 예배 출석 명단</h4>
        <span className="text-sm">
          (기준일: {recentSunday.format("YYYY-MM-DD")})
        </span>
      </div>
      <AttendnaceTable recentSunday={recentSunday} />
      <AttendanceCountTable recentSunday={recentSunday} />
    </BlockContainer>
  );
};

export default AttendanceOverview;
