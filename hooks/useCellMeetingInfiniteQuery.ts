import {useInfiniteQuery} from "react-query";
import {fetchCellMeetingHistoricalWeekly} from "../firebase/CellMeeting/CellMeetingStatic";

export const useCellMeetingInfiniteQuery = () => {
  return useInfiniteQuery(
    ["getCellMeetingHistoricalWeekly"],
    fetchCellMeetingHistoricalWeekly,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.lastVisible) {
          return lastPage.lastVisible; // 다음 페이지 기준 문서 반환
        }
        return undefined; // 다음 페이지가 없을 경우 undefined 반환
      },
      staleTime: 10 * 60 * 1000, // 데이터가 신선한 상태로 유지되는 시간
      cacheTime: 30 * 60 * 1000, // 캐시 데이터 유지 시간
    }
  );
};
