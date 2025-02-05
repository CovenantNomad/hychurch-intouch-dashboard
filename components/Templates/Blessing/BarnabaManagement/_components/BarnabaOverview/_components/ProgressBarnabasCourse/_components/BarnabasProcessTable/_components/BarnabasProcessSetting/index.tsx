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
  barnabasName: string;
  menteeName: string;
  menteeId: string;
  status: TMatchingStatus;
  completedMeetingCount: string;
};

const BarnabasProcessSetting = ({
  matchingId,
  barnabasName,
  menteeName,
  menteeId,
  status,
  completedMeetingCount,
}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [changedStatus, setChangedStatus] = useState<TMatchingStatus | null>(
    null
  );

  const mutation = useMutation(
    ({
      matchingId,
      status,
      description,
    }: {
      matchingId: string;
      status: TMatchingStatus;
      description?: string;
    }) => updateBarnabaMentorship({matchingId, status, description}),
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
        status: changedStatus,
        description,
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
            {barnabasName}-{menteeName} 바나바 과정
          </DialogTitle>
          <DialogDescription className="text-sm text-black">
            현재 바나바 과정은{" "}
            <span
              className={`${
                status === TMatchingStatus.PROGRESS
                  ? "text-teal-500"
                  : status === TMatchingStatus.PENDING
                  ? "text-gray-500"
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
                    ? "bg-amber-500"
                    : "bg-gray-300 hover:bg-amber-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.FAILED)}
            >
              미이수
            </div>
            <div
              className={`flex-1 py-5 text-sm font-semibold text-center text-white cursor-pointer transition 
                ${
                  changedStatus === TMatchingStatus.COMPLETED
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-blue-400"
                }`}
              onClick={() => setChangedStatus(TMatchingStatus.COMPLETED)}
            >
              과정수료
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
