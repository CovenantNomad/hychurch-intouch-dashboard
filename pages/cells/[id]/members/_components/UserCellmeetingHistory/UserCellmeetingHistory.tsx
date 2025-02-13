import {useQuery} from "react-query";
import Skeleton from "../../../../../../components/Atoms/Skeleton/Skeleton";
import WeeklyHeatMap from "../../../../../../components/ui/WeeklyHeatMap";
import {getCellMeetingIndividualHistory} from "../../../../../../firebase/CellMeeting/CellMeetingIndividual";

type Props = {
  userId: string;
};

const UserCellmeetingHistory = ({userId}: Props) => {
  const {isLoading, data} = useQuery(
    ["getCellMeetingIndividualHistory", userId],
    () => getCellMeetingIndividualHistory(userId),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="border p-6 rounded-xl shadow-sm bg-white">
      <div className="mb-2">
        <h6 className="font-medium">최근 52주 셀모임 참석 데이터</h6>
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-[192px]" />
      ) : data ? (
        <WeeklyHeatMap data={data} />
      ) : (
        <div className="h-[192px] flex justify-center items-center border border-gray-200 rounded-md text-sm">
          데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default UserCellmeetingHistory;
