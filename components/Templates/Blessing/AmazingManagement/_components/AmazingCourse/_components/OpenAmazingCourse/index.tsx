import dayjs from "dayjs";
import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {openAmazingCourse} from "../../../../../../../../firebase/Barnabas/barnabas";
import {
  TAmazingCourse,
  TAmazingCourseStatus,
} from "../../../../../../../../interface/barnabas";
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

type Props = {};

const OpenAmazingCourse = ({}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [cohort, setCohort] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const {mutateAsync, isLoading} = useMutation(
    (courseData: TAmazingCourse) => openAmazingCourse(courseData),
    {
      onSuccess: (data) => {
        data.success ? toast.success(data.message) : toast.error(data.message);
        queryClient.invalidateQueries(["getAmazingCourse"]);
        setCohort(""); // ✅ 입력 필드 초기화
        setIsOpen(false); // ✅ 성공 시 다이얼로그 닫기
      },
      onError: (error) => {
        console.error("바나바 매칭 실패", error);
        toast.error("어메이징 과정 개설 실패");
      },
    }
  );

  const onSubmitHandler = async () => {
    if (!cohort.trim()) return;

    const courseData: TAmazingCourse = {
      cohort,
      date: startDate,
      status: TAmazingCourseStatus.OPEN,
    };

    await mutateAsync(courseData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-2 bg-black text-white text-sm rounded-md">
          어메이징 과정 개설
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>어메이징 과정 개설</DialogTitle>
          <DialogDescription className="text-sm">
            기수를 입력해서 어메이징 과정을 개설해주세요
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-end justify-between">
            <label className="text-gray-700 text-sm font-medium pb-1">
              어메이징 기수
            </label>
            <div className="relative w-[35%]">
              <input
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="border-b border-gray-300 p-1 pr-8 w-full text-sm text-right focus:outline-none"
                placeholder="기수를 입력해주세요"
              />
              <span className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500">
                기
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <label className="text-gray-700 text-sm font-medium pb-1">
              시작예정일
            </label>
            <div className="relative w-[35%]">
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-b border-gray-300 p-1 pr-2 w-full text-sm text-right focus:outline-none"
                placeholder="날짜를 입력해주세요."
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            YYYY-MM-DD 형식(연도4자리, 월/일은 0채워서 2자리)으로 입력해주세요
          </p>
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
              disabled={isLoading || !cohort.trim()}
              className="w-full mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-blue-600 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "개설 중..." : " 개설"}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenAmazingCourse;
