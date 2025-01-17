import {useQuery} from "react-query";
import WeeklyHeatMap from "../../../../../../components/ui/WeeklyHeatMap";
import {getCellMeetingIndividualHistory} from "../../../../../../firebase/CellMeeting/CellMeetingIndividual";

type Props = {
  userId: string;
};

const UserCellmeetingHistory = ({userId}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getCellMeetingIndividualHistory", userId],
    () => getCellMeetingIndividualHistory(userId),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="border px-4 py-4 rounded-md bg-white">
      <div className="mb-2">
        <h6 className="text-base font-medium text-gray-700">
          최근 52주 셀모임 참석 데이터
        </h6>
      </div>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : data ? (
        <WeeklyHeatMap data={data} />
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default UserCellmeetingHistory;
