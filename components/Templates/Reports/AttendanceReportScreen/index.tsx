//components
import useCheckCellAttendanceSubmissions from "../../../../hooks/useCheckCellAttendanceSubmissions";
import {getMostRecentSunday} from "../../../../utils/dateUtils";
import BlockCardContainer from "../../../Atoms/Container/BlockCardContainer";
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
          <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-5 lg:gap-x-2">
            {communityKeys.map((communityName) => (
              <BlockCardContainer key={communityName}>
                <AttendanceCommunitySection
                  communityName={communityName}
                  communityCells={communities[communityName] ?? []}
                />
              </BlockCardContainer>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
