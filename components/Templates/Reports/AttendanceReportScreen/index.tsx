import React from "react";
//components
import Spinner from "../../../Atoms/Spinner";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import BlockCardContainer from "../../../Atoms/Container/BlockCardContainer";
import AttendanceHeader from "../../../Organisms/Reports/AttendanceHeader/AttendanceHeader";
import { getMostRecentSunday } from "../../../../utils/dateUtils";
import useCheckCellAttendanceSubmissions from "../../../../hooks/useCheckCellAttendanceSubmissions";
import AttendanceCommunitySection from "../../../Organisms/Reports/AttendanceCommunitySection/AttendanceCommunitySection";

interface AttendanceReportScreenProps {}

const AttendanceReportScreen = ({}: AttendanceReportScreenProps) => {
  const recentSunday = getMostRecentSunday();
  const { isLoading, attendanceStatus, communityWay, communityTruth, communityLife, communityLight } = useCheckCellAttendanceSubmissions(recentSunday.format('YYYY-MM-DD'))

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <AttendanceHeader attendanceDate={recentSunday.format('YYYY-MM-DD')} attendanceStatus={attendanceStatus} />
          </BlockContainer>
          <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2 ">
            <BlockCardContainer>
              <AttendanceCommunitySection 
                communityName="길"
                communityCells={communityWay}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection 
                communityName="진리"
                communityCells={communityTruth}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection 
                communityName="생명"
                communityCells={communityLife}
              />
            </BlockCardContainer>
            <BlockCardContainer>
              <AttendanceCommunitySection 
                communityName="빛"
                communityCells={communityLight}
              />
            </BlockCardContainer>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceReportScreen;
