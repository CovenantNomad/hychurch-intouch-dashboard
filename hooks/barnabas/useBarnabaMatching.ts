import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {useRecoilValue} from "recoil";
import {
  createBarnabaMatching,
  updateSingleMemberStatus,
} from "../../firebase/Barnabas/barnabas";
import {TMatching, TMenteeStatus} from "../../interface/barnabas";
import {menteeSortState} from "../../stores/barnabaState";

export const useBarnabaMatching = () => {
  const queryClient = useQueryClient();
  const sortState = useRecoilValue(menteeSortState);

  // 🔥 바나바 매칭 생성 및 상태 업데이트
  const {mutate, isLoading} = useMutation(
    (matchingData: Omit<TMatching, "id">) =>
      createBarnabaMatching(matchingData),
    {
      onSuccess: async (_, matchingData) => {
        toast.success("바나바 매칭 성공");

        // 🔥 개별 멘티 상태 업데이트
        const updatedStatus = await updateSingleMemberStatus(
          matchingData.menteeId
        );
        queryClient.setQueryData<Record<string, TMenteeStatus>>(
          [
            "fetchMenteeStatuses",
            `menteeTable_${sortState.itemsPerPage}_${sortState.currentPage}`,
          ],
          (prevStatuses) => ({
            ...prevStatuses,
            [matchingData.menteeId]: updatedStatus, // 변경된 멘티 상태만 업데이트
          })
        );
        queryClient.invalidateQueries([
          "fetchMenteeStatuses",
          `menteeTable_${sortState.itemsPerPage}_${sortState.currentPage}`,
        ]);
        queryClient.invalidateQueries(["fetchLatestMentorship"]);
        queryClient.refetchQueries(["getBarnabasCourseByStatus"]);
        queryClient.refetchQueries(["fetchAvailableMentees"]);
      },
      onError: (error) => {
        console.error("바나바 매칭 실패", error);
        toast.error("바나바 매칭 실패");
      },
    }
  );

  return {mutate, isLoading};
};
