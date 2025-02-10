import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {Button} from "@tremor/react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {updateBarnabaMentorship} from "../../../../../../../../../../../../firebase/Barnabas/barnabas";
import {TMatchingStatus} from "../../../../../../../../../../../../interface/barnabas";
import {convertMatchingMessage} from "../../../../../../../../../../../../utils/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../../../../../../ui/Dialog";

type Props = {
  matchingId: string;
  barnabaId: string;
  barnabaName: string;
  menteeName: string;
  menteeId: string;
  status: TMatchingStatus;
  completedMeetingCount: string;
};

const BarnabasProcessSetting = ({
  matchingId,
  barnabaId,
  barnabaName,
  menteeName,
  menteeId,
  status,
  completedMeetingCount,
}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [changedStatus, setChangedStatus] = useState<TMatchingStatus>(status);

  const mutation = useMutation(
    ({
      matchingId,
      barnabaId,
      status,
      description,
      menteeId,
      menteeName,
    }: {
      barnabaId: string;
      matchingId: string;
      status: TMatchingStatus;
      description?: string;
      menteeId: string;
      menteeName: string;
    }) =>
      updateBarnabaMentorship({
        matchingId,
        barnabaId,
        status,
        description,
        menteeId,
        menteeName,
      }),
    {
      onSuccess: async (_, variables) => {
        toast.success("바나바과정 업데이트 성공");

        // 🔹 최신 데이터 동기화
        queryClient.invalidateQueries([
          "getBarnabasCourseByStatus",
          TMatchingStatus.PROGRESS,
        ]);
        queryClient.invalidateQueries([
          "getBarnabasCourseByStatus",
          TMatchingStatus.PENDING,
        ]);
        queryClient.invalidateQueries(["fetchMenteeStatuses"]);
        queryClient.invalidateQueries(["fetchBarnabaMentorship", menteeId]);
        queryClient.invalidateQueries(["getCompletedOrFailedMentorships"]);
        queryClient.invalidateQueries(["fetchLatestMentorship"]);
        queryClient.invalidateQueries(["getAmazingWaitingList"]);
      },
      onError: (error) => {
        console.error("바나바과정 업데이트 실패", error);
        toast.error("바나바과정 업데이트 실패");
      },
    }
  );

  const onSubmitHandler = () => {
    if (changedStatus !== null) {
      mutation.mutate({
        matchingId,
        barnabaId,
        status: changedStatus,
        description,
        menteeId,
        menteeName,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Cog6ToothIcon className="h-6 w-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>
            {barnabaName}-{menteeName} 바나바 과정
          </DialogTitle>
          <DialogDescription className="text-sm text-black">
            현재 바나바 과정은{" "}
            <span
              className={`${
                status === TMatchingStatus.PROGRESS
                  ? "text-teal-500"
                  : status === TMatchingStatus.PENDING
                  ? "text-amber-500"
                  : ""
              }`}
            >
              {completedMeetingCount}주차 {convertMatchingMessage(status)}
            </span>{" "}
            입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <h5 className="text-sm font-semibold mb-1">상태변경</h5>
          <div className="w-full flex rounded-xl overflow-hidden">
            <div
              className={`flex-1 py-5 text-sm font-semibold text-center text-white border-r border-white cursor-pointer transition 
                ${
                  changedStatus === TMatchingStatus.FAILED
                    ? "bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.FAILED)}
            >
              보류
            </div>
            <div
              className={`flex-1 py-5 text-sm font-semibold text-center text-white border-r border-white cursor-pointer transition 
                ${
                  changedStatus === TMatchingStatus.PENDING
                    ? "bg-amber-500"
                    : "bg-gray-200 hover:bg-amber-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.PENDING)}
            >
              지연중
            </div>
            <div
              className={`flex-1 py-5 text-sm font-semibold text-center text-white border-r border-white cursor-pointer transition 
                ${
                  changedStatus === TMatchingStatus.PROGRESS
                    ? "bg-emerald-500"
                    : "bg-gray-200 hover:bg-emerald-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.PROGRESS)}
            >
              진행중
            </div>
            <div
              className={`flex-1 py-5 text-sm font-semibold text-center text-white cursor-pointer transition 
                ${
                  changedStatus === TMatchingStatus.COMPLETED
                    ? "bg-blue-500"
                    : "bg-gray-200 hover:bg-blue-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.COMPLETED)}
            >
              수료
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <label htmlFor="description" className="text-sm font-semibold">
              사유 (필요시 입력)
            </label>
            <input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="사유를 입력해주세요"
              className="mt-2 border-b ring-0 outline-none text-sm"
            />
          </div>
        </div>
        <DialogFooter className="mt-10">
          <DialogClose asChild>
            <Button className="mt-2 w-full sm:mt-0 sm:w-fit border border-gray-300 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onSubmitHandler}>저장</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarnabasProcessSetting;
