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
    ({
      matchingId,
      barnabaId,
      reset,
    }: {
      matchingId: string;
      barnabaId: string;
      reset: boolean;
    }) => reStartBarnabaMentorship({matchingId, barnabaId, reset}),
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
        <DialogFooter className="mt-6 items-center">
          <div className="flex-1 flex justify-start items-center">
            <DialogClose asChild>
              <button className="py-2 px-4 hover:bg-gray-100 text-sm">
                취소
              </button>
            </DialogClose>
          </div>
          <div className="flex space-x-3">
            <DialogClose asChild>
              <button
                className="border py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-600 text-sm text-white"
                onClick={() =>
                  mutation.mutate({matchingId, barnabaId, reset: false})
                }
              >
                이어서 시작
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                className="border py-2 px-4 rounded-md bg-gray-800 hover:bg-gray-600 text-sm text-white"
                onClick={() =>
                  mutation.mutate({matchingId, barnabaId, reset: true})
                }
              >
                새로 시작
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarnabasRestartButton;
