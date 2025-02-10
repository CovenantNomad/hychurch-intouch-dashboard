import {useQuery} from "react-query";
import {getAmazingHoldingList} from "../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../interface/barnabas";
import {useCompletedOrFailedMentees} from "./useCompletedOrFailedMentees";

export const useAmazingHoldingList = () => {
  // ✅ 바나바 과정에서 완료된 멘티들
  const {completedMentees, isLoading: isCompletedMenteeLoading} =
    useCompletedOrFailedMentees();

  const {data: holdingList, isLoading: isMentorshipLoading} = useQuery(
    ["getAmazingHoldingList"],
    getAmazingHoldingList,
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const isLoading = isCompletedMenteeLoading || isMentorshipLoading;

  // ✅ waitingList 기준으로 completedMentees 데이터를 병합
  const mergedList = holdingList?.map((waiting) => {
    const matchingData = completedMentees.find(
      (mentee) => mentee.menteeId === waiting.menteeId
    );

    return {
      ...waiting, // ✅ 어메이징 과정 데이터 기본값
      barnabaId: matchingData?.barnabaId || "", // 바나바 과정 ID (없으면 빈 값)
      barnabaName: matchingData?.barnabaName || "", // 바나바 이름
      matchingDate: matchingData?.matchingDate || "", // 바나바 과정 시작일
      completedDate: matchingData?.completedDate || "", // 바나바 과정 완료일
      completedMeetingCount: matchingData?.completedMeetingCount || "0",
      scheduledMeetingCount: matchingData?.scheduledMeetingCount || "0",
      description: matchingData?.description || "", // 설명
      barnabasStatus: matchingData?.status || TMatchingStatus.COMPLETED,
    };
  });

  return {data: mergedList, isLoading};
};
