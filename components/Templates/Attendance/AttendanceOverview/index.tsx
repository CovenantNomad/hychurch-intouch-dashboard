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
  const { isLoading, isFetching, data: attendanceCompleteStatus } = useFindAttendanceCheckQuery<
    FindAttendanceCheckQuery,
    FindAttendanceCheckQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: recentSunday.format('YYYY-MM-DD'),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // attendanceCompleteStatus && attendanceCompleteStatus.attendanceCheck === AttendanceCheckStatus.Completed

  return (
    <BlockContainer firstBlock>
      {isLoading || isFetching ? (
        <div className="py-10">
          <Spinner />
        </div>
      ) : (
        <>
          {true ? (
            <div className="space-y-4">
              <AttendnaceTable recentSunday={recentSunday} />
              <AttendanceCountTable recentSunday={recentSunday}/>
            </div>
          ) : (
            <NotCompleteAttendance />
          )}
        </>
      )}
    </BlockContainer>
  );
};

export default AttendanceOverview;
