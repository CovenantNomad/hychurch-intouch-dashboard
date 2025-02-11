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
  const {
    isLoading,
    attendanceStatus,
    communityOne,
    communityTwo,
    communityThree,
    communityFour,
    communityFive,
  } = useCheckCellAttendanceSubmissions(recentSunday.format("YYYY-MM-DD"));

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
          <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-5 lg:gap-x-2 ">
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛1"
                communityCells={communityOne}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛2"
                communityCells={communityTwo}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛3"
                communityCells={communityThree}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛4"
                communityCells={communityFour}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛5"
                communityCells={communityFive}
              />
            </BlockCardContainer>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
