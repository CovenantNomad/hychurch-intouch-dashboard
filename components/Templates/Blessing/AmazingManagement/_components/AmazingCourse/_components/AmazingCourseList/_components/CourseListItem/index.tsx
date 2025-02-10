import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {updateAmazingMenteeStatus} from "../../../../../../../../../../firebase/Barnabas/barnabas";
import {
  TAmazingMember,
  TAmazingMentorshipStatus,
} from "../../../../../../../../../../interface/barnabas";
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
  cohort: string;
  member: Omit<TAmazingMember, "amazingCohort">;
};

const CourseListItem = ({cohort, member}: Props) => {
  const queryClient = useQueryClient();
  const [isPendingOpen, setIsPendingOpen] = useState(false);
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);

  const mutate = useMutation(
    ({
      cohort,
      menteeId,
      status,
    }: {
      cohort: string;
      menteeId: string;
      status: TAmazingMentorshipStatus;
    }) => updateAmazingMenteeStatus(cohort, menteeId, status),
    {
      onSuccess: (data) => {
        data.success ? toast.success(data.message) : toast.error(data.message);
        queryClient.invalidateQueries(["getAmazingCourse"]);
        queryClient.invalidateQueries(["getAmazingWaitingList"]);
        queryClient.invalidateQueries(["getAmazingHoldingList"]);
        queryClient.invalidateQueries(["fetchMenteeStatuses"]);
        setIsPendingOpen(false);
        setIsWaitingOpen(false);
      },
      onError: (error) => {
        console.error("바나바 매칭 실패", error);
        toast.error("어메이징 과정 개설 실패");
      },
    }
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 shadow">
      <div className="text-gray-800">{member.menteeName}</div>
      <div className="flex space-x-2">
        <Dialog open={isPendingOpen} onOpenChange={setIsPendingOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 text-sm text-gray-500 rounded-lg shadow hover:bg-gray-100 focus:outline-none">
              보류
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg overflow-visible">
            <DialogHeader>
              <DialogTitle>어메이징 과정 보류</DialogTitle>
              <DialogDescription className="text-sm">
                {member.menteeName}, 어메이징 {cohort}기에서 보류하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <button className="w-full mr-2 mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300">
                  취소
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  onClick={() =>
                    mutate.mutate({
                      cohort,
                      menteeId: member.menteeId,
                      status: TAmazingMentorshipStatus.PENDING,
                    })
                  }
                  className="w-full mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-gray-600 text-white bg-gray-600 rounded-md shadow hover:bg-gray-500 focus:outline-none hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  보류
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isWaitingOpen} onOpenChange={setIsWaitingOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 text-sm text-amber-500 rounded-lg shadow hover:bg-amber-100 focus:outline-none">
              대기
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg overflow-visible">
            <DialogHeader>
              <DialogTitle>어메이징 과정 대기</DialogTitle>
              <DialogDescription className="text-sm">
                {member.menteeName}, 어메이징 {cohort}기에서 대기상태로
                변경하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <button className="w-full mr-2 mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300">
                  취소
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  onClick={() =>
                    mutate.mutate({
                      cohort,
                      menteeId: member.menteeId,
                      status: TAmazingMentorshipStatus.WAITING,
                    })
                  }
                  className="w-full mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-amber-600 text-white bg-amber-600 rounded-md shadow hover:bg-amber-500 focus:outline-none hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  대기
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CourseListItem;
