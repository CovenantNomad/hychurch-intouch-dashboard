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
    LIGHTONE,
    LIGHTTWO,
    LIGHTTHREE,
    LIGHTFOUR,
    LIGHTFIVE,
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
                communityCells={LIGHTONE}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛2"
                communityCells={LIGHTTWO}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛3"
                communityCells={LIGHTTHREE}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛4"
                communityCells={LIGHTFOUR}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection
                communityName="빛5"
                communityCells={LIGHTFIVE}
              />
            </BlockCardContainer>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
