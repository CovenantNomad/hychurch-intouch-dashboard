import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {reStartBarnabaMentorship} from "../../../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../../../interface/barnabas";

type Props = {
  matchingId: string;
  menteeId: string;
};

const BarnabasRestartButton = ({matchingId, menteeId}: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (matchingId: string) => reStartBarnabaMentorship(matchingId),
    {
      onSuccess: async (_, variables) => {
        toast.success("바나바과정 재시작");

        // 🔹 최신 데이터 동기화
        queryClient.invalidateQueries([
          "getBarnabasCourseByStatus",
          TMatchingStatus.PROGRESS,
        ]);
        queryClient.invalidateQueries(["getCompletedOrFailedMentorships"]);
        queryClient.invalidateQueries(["fetchMenteeStatuses"]);
        queryClient.invalidateQueries(["fetchBarnabaMentorship", menteeId]);
      },
      onError: (error) => {
        console.error("바나바과정 재시작 실패:", error);
        toast.error("바나바과정 재시작 실패");
      },
    }
  );
  return (
    <button
      className="bg-red-500 text-white px-1 py-1 rounded-md"
      onClick={() => mutation.mutate(matchingId)}
    >
      재시작
    </button>
  );
};

export default BarnabasRestartButton;
