import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import { AttendanceCheckStatus, FindAttendanceCheckQuery, FindAttendanceCheckQueryVariables, useFindAttendanceCheckQuery } from "../../../../graphql/generated";
import { getMostRecentSunday } from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spinner from "../../../Atoms/Spinner";
import AttendnaceTable from "../../../Organisms/Attendance/AttendanceByCell/AttendnaceTable";
import AttendanceCountTable from "../../../Organisms/Attendance/AttendanceCountTable/AttendanceCountTable";
import NotCompleteAttendance from "../../../Organisms/Attendance/NotCompleteAttendance/NotCompleteAttendance";

type AttendanceOverviewProps = {}

const AttendanceOverview = ({}: AttendanceOverviewProps) => {
  const recentSunday = getMostRecentSunday();

  return (
    <BlockContainer firstBlock>
      <AttendnaceTable recentSunday={recentSunday} />
      <AttendanceCountTable recentSunday={recentSunday}/>
    </BlockContainer>
  );
};

export default AttendanceOverview;
