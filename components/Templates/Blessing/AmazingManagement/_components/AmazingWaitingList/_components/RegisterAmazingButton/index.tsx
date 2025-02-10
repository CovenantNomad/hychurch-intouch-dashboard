import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {
  getAmazingCourse,
  registerAmazingCourse,
} from "../../../../../../../../firebase/Barnabas/barnabas";
import {
  TAmazingMember,
  TAmazingMentorshipStatus,
} from "../../../../../../../../interface/barnabas";
import {cx} from "../../../../../../../../utils/utils";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../../ui/Dialog";

type Props = {
  menteeId: string;
  menteeName: string;
};

const RegisterAmazingButton = ({menteeId, menteeName}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cohort, setCohort] = useState<string>("");

  const {isLoading: isCourseLoading, data: courses} = useQuery(
    ["getAmazingCourse"],
    () => getAmazingCourse(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {mutateAsync, isLoading} = useMutation(
    ({cohort, registerData}: {cohort: string; registerData: TAmazingMember}) =>
      registerAmazingCourse(cohort, registerData),
    {
      onSuccess: (data) => {
        data.success ? toast.success(data.message) : toast.error(data.message);
        queryClient.invalidateQueries(["getAmazingCourse"]);
        queryClient.invalidateQueries(["getAmazingWaitingList"]);
        queryClient.invalidateQueries(["getAmazingHoldingList"]);
        queryClient.invalidateQueries(["fetchMenteeStatuses"]);
        setCohort(""); // ✅ 입력 필드 초기화
        setIsOpen(false); // ✅ 성공 시 다이얼로그 닫기
      },
      onError: (error) => {
        console.error("어메이징 과정 등록 실패", error);
        toast.error("어메이징 과정 등록 실패");
      },
    }
  );

  const onSubmitHandler = async () => {
    if (!cohort.trim()) {
      toast.error("어메이징 기수를 선택해주세요");
      return;
    }

    const registerData = {
      amazingCohort: cohort,
      menteeId,
      menteeName,
      status: TAmazingMentorshipStatus.PROGRESS,
    };

    mutateAsync({cohort, registerData});
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 bg-black text-white text-sm rounded-md">
          어메이징 등록
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>어메이징 과정 등록</DialogTitle>
          <DialogDescription className="text-sm">
            어메이징 과정을 진행할 기수를 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h5 className="text-sm font-medium mb-2">현재 개설된 기수</h5>
          {isCourseLoading ? (
            <Skeleton className="h-[100px] w-full" />
          ) : courses && courses.length !== 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border px-2 py-2 rounded-lg"
                >
                  <div>{course.cohort}기</div>
                  <div className="h-6 w-6 flex justify-center items-center rounded-full border border-gray-200">
                    <button
                      onClick={() => setCohort(course.cohort)}
                      className={cx(
                        "h-4 w-4 rounded-full",
                        cohort === course.cohort
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300",
                        "hover:bg-blue-500 hover:text-white"
                      )}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[100px] flex justify-center items-center text-sm border border-gray-200 rounded-md">
              현재 개설된 어메이징 기수가 없습니다.
            </div>
          )}
        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <button className="w-full mr-2 mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300">
              취소
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={() => onSubmitHandler()}
              disabled={!cohort.trim() || isLoading}
              className="w-full mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-blue-600 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "등록중..." : "등록"}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterAmazingButton;
