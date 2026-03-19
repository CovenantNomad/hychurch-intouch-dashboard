//components
import useCheckCellAttendanceSubmissions from "../../../../hooks/useCheckCellAttendanceSubmissions";
import {getMostRecentSunday} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spinner from "../../../Atoms/Spinner";
import AttendanceCommunitySection from "../../../Organisms/Reports/AttendanceCommunitySection/AttendanceCommunitySection";
import AttendanceHeader from "../../../Organisms/Reports/AttendanceHeader/AttendanceHeader";

interface AttendanceReportScreenProps {}

const AttendanceReportScreen = ({}: AttendanceReportScreenProps) => {
  const recentSunday = getMostRecentSunday();
  const {isLoading, attendanceStatus, communities, communityKeys} =
    useCheckCellAttendanceSubmissions(recentSunday.format("YYYY-MM-DD"));

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <AttendanceHeader
              attendanceDate={recentSunday.format("YYYY-MM-DD")}
              attendanceStatus={attendanceStatus}
            />
          </BlockContainer>
          <BlockContainer>
            <div className="space-y-3">
              {communityKeys.map((communityName) => (
                <AttendanceCommunitySection
                  key={communityName}
                  communityName={communityName}
                  communityCells={communities[communityName] ?? []}
                />
              ))}
            </div>
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
