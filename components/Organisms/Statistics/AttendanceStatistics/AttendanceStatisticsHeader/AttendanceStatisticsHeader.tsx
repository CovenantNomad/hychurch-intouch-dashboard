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
  const {isLoading, communities, communityKeys, specialCells} =
    useCheckCellAttendanceSubmissions(recentSunday.format("YYYY-MM-DD"));

  return (
    <div className="space-y-2 mt-2 lg:space-y-0 lg:divide-y lg:divide-gray-300 lg:mt-4">
      {communityKeys.map((communityName) => (
        <CommunityAccordian
          key={communityName}
          isLoading={isLoading}
          communityName={communityName}
          checkSubmission={communities[communityName] ?? []}
          onSelectHandler={onSelectHandler}
        />
      ))}
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
