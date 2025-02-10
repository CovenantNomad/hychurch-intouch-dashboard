import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {reStartBarnabaMentorship} from "../../../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../../../interface/barnabas";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../../../../ui/Dialog";

type Props = {
  matchingId: string;
  barnabaId: string;
  menteeId: string;
};

const BarnabasRestartButton = ({matchingId, barnabaId, menteeId}: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (matchingId: string) => reStartBarnabaMentorship(matchingId, barnabaId),
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
        queryClient.invalidateQueries(["fetchLatestMentorship"]);
      },
      onError: (error) => {
        console.error("바나바과정 재시작 실패:", error);
        toast.error("바나바과정 재시작 실패");
      },
    }
  );
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-red-500 text-white px-1 py-1 rounded-md">
          재시작
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>바나바 과정 재시작</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6 text-gray-700">
            보류 되었던 바나바과정을 다시 시작하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <button className="mt-2 w-full sm:mt-0 sm:w-fit sm:mr-2 border py-2 px-4 rounded-md border-blue-500 text-blue-500">
              취소
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className="w-full sm:w-fit border py-2 px-4 rounded-md bg-blue-500 text-white"
              onClick={() => mutation.mutate(matchingId)}
            >
              재시작
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarnabasRestartButton;
