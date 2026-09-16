import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {Button} from "@tremor/react";
import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {
  updateBarnabaMentorship,
  updateScheduledMeetingCount,
} from "../../../../../../../../../../../../firebase/Barnabas/barnabas";
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
  scheduledMeetingCount: string;
};

const BarnabasProcessSetting = ({
  matchingId,
  barnabaId,
  barnabaName,
  menteeName,
  menteeId,
  status,
  completedMeetingCount,
  scheduledMeetingCount,
}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [changedStatus, setChangedStatus] = useState<TMatchingStatus>(status);
  const [changedScheduledMeetingCount, setChangedScheduledMeetingCount] =
    useState<string>(scheduledMeetingCount);

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
    },
  );
  const scheduledMeetingMutation = useMutation(
    ({
      matchingId,
      barnabaId,
      scheduledMeetingCount,
    }: {
      matchingId: string;
      barnabaId: string;
      scheduledMeetingCount: string;
    }) =>
      updateScheduledMeetingCount({
        matchingId,
        barnabaId,
        scheduledMeetingCount,
      }),
    {
      onSuccess: () => {
        toast.success("예정된 주차를 변경했습니다.");

        queryClient.invalidateQueries([
          "getBarnabasCourseByStatus",
          TMatchingStatus.PROGRESS,
        ]);

        queryClient.invalidateQueries(["fetchBarnabaMentorship", menteeId]);
        queryClient.invalidateQueries(["fetchLatestMentorship"]);
        queryClient.invalidateQueries(["getAllMeetingReivews"]);
      },

      onError: (error) => {
        console.error("예정된 주차 변경 실패", error);
        toast.error("예정된 주차 변경에 실패했습니다.");
      },
    },
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

  const handleScheduledMeetingCountUpdate = () => {
    const nextCount = Number(changedScheduledMeetingCount);
    const completedCount = Number(completedMeetingCount);

    if (!nextCount || nextCount < 1) {
      toast.error("과정 주차를 입력해주세요.");
      return;
    }

    if (nextCount < completedCount) {
      toast.error(
        `이미 ${completedMeetingCount}주차까지 완료되어 ${completedMeetingCount}주 미만으로 변경할 수 없습니다.`,
      );
      return;
    }

    scheduledMeetingMutation.mutate({
      matchingId,
      barnabaId,
      scheduledMeetingCount: String(nextCount),
    });
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
          <div className="mb-6">
            <h5 className="text-sm font-semibold mb-2">예정된 과정 주차</h5>

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">전체 과정</p>

                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className="text-gray-500">현재 예정 주차</span>

                    <span className="font-semibold text-blue-600">
                      {scheduledMeetingCount}주
                    </span>

                    <span className="text-gray-300">|</span>

                    <span className="text-gray-500">만남 완료 주차</span>

                    <span className="font-semibold text-gray-700">
                      {completedMeetingCount}주
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">변경</span>

                  <input
                    type="number"
                    min={Number(completedMeetingCount)}
                    value={changedScheduledMeetingCount}
                    onChange={(e) =>
                      setChangedScheduledMeetingCount(e.target.value)
                    }
                    className="w-16 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-center text-sm font-medium outline-none focus:border-blue-500"
                  />

                  <span className="text-sm text-gray-600">주</span>

                  <button
                    type="button"
                    disabled={
                      changedScheduledMeetingCount === scheduledMeetingCount ||
                      scheduledMeetingMutation.isLoading
                    }
                    onClick={handleScheduledMeetingCountUpdate}
                    className="rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {scheduledMeetingMutation.isLoading ? "변경중" : "변경"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
