import useCheckCellAttendanceSubmissions from "../../../../../hooks/useCheckCellAttendanceSubmissions";
import {getMostRecentSunday} from "../../../../../utils/dateUtils";
import CommunityAccordian from "../CommunityAccordian";

interface AttendanceStatisticsHeaderProps {
  onSelectHandler: (id: string, name: string) => void;
}

const AttendanceStatisticsHeader = ({
  onSelectHandler,
}: AttendanceStatisticsHeaderProps) => {
  const recentSunday = getMostRecentSunday();
  const {
    isLoading: isCheckLoading,
    communityOne,
    communityTwo,
    communityThree,
    communityFour,
    communityFive,
    specialCells,
  } = useCheckCellAttendanceSubmissions(recentSunday.format("YYYY-MM-DD"));

  return (
    <div className="space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4">
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"빛1"}
        checkSubmission={communityOne}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"빛2"}
        checkSubmission={communityTwo}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"빛3"}
        checkSubmission={communityThree}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"빛4"}
        checkSubmission={communityFour}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"빛5"}
        checkSubmission={communityFive}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isCheckLoading}
        communityName={"특별"}
        checkSubmission={specialCells}
        onSelectHandler={onSelectHandler}
      />
    </div>
  );
};

export default AttendanceStatisticsHeader;
