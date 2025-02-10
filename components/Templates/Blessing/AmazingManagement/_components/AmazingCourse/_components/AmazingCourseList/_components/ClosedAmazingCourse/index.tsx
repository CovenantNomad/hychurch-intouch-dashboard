import {useState} from "react";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {closeAmazingCourse} from "../../../../../../../../../../firebase/Barnabas/barnabas";
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
};

const ClosedAmazingCourse = ({cohort}: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const {mutate, isLoading} = useMutation(
    (cohort: string) => closeAmazingCourse(cohort),
    {
      onSuccess: (data) => {
        data.success ? toast.success(data.message) : toast.error(data.message);
        queryClient.invalidateQueries(["getAmazingCourse"]);
        queryClient.invalidateQueries(["fetchMenteeStatuses"]);
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("어메이징 과정 종료 실패", error);
        toast.error("어메이징 과정 종료 실패");
      },
    }
  );

  const onSubmitHandler = () => {
    mutate(cohort);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center py-2 px-8 rounded-lg border-stone-400 text-base text-stone-400 border hover:bg-stone-600 hover:border-stone-600 hover:text-white">
          과정 종료
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>어메이징 과정 종류</DialogTitle>
          <DialogDescription className="text-sm">
            어메이징 {cohort}기를 종료하시겠습니까?
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
              onClick={() => onSubmitHandler()}
              disabled={isLoading || !cohort.trim()}
              className="w-full mt-2 sm:mt-0 sm:w-fit px-4 py-1.5 border border-blue-600 text-white bg-blue-600 rounded-md shadow hover:bg-blue-500 focus:outline-none hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "종료 중..." : " 종료"}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClosedAmazingCourse;
