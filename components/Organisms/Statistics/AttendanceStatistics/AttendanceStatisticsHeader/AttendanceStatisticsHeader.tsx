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
    isLoading,
    LIGHTONE,
    LIGHTTWO,
    LIGHTTHREE,
    LIGHTFOUR,
    LIGHTFIVE,
    specialCells,
  } = useCheckCellAttendanceSubmissions(recentSunday.format("YYYY-MM-DD"));

  return (
    <div className="space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4">
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"빛1"}
        checkSubmission={LIGHTONE}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"빛2"}
        checkSubmission={LIGHTTWO}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"빛3"}
        checkSubmission={LIGHTTHREE}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"빛4"}
        checkSubmission={LIGHTFOUR}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"빛5"}
        checkSubmission={LIGHTFIVE}
        onSelectHandler={onSelectHandler}
      />
      <CommunityAccordian
        isLoading={isLoading}
        communityName={"특별"}
        checkSubmission={specialCells}
        onSelectHandler={onSelectHandler}
      />
    </div>
  );
};

export default AttendanceStatisticsHeader;
