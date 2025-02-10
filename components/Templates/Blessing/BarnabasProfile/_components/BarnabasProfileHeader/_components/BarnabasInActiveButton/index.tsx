import {useMutation, useQueryClient} from "react-query";
import {updateBarnabaActiveStatus} from "../../../../../../../../firebase/Barnabas/barnabas";
import {cx} from "../../../../../../../../utils/utils";
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
  barnabaId: string;
  isActive: boolean;
};

const BarnabasInActiveButton = ({barnabaId, isActive}: Props) => {
  const queryClient = useQueryClient();
  const mutate = useMutation(
    ({barnabaId, isActive}: {barnabaId: string; isActive: boolean}) =>
      updateBarnabaActiveStatus(barnabaId, !isActive),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBarnabasProfileById", barnabaId]);
        queryClient.invalidateQueries(["getGroupedDataByCohort"]);
        queryClient.invalidateQueries(["getGroupedBarnabasByAge"]);
      },
    }
  );
  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={cx(
            "text-sm rounded-md px-3 py-2 text-white",
            isActive ? "bg-rose-500" : "bg-blue-500"
          )}
        >
          {isActive ? "비활동 전환" : "활동 전환"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>바나바 활동/비활동 설정</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6 text-gray-700">
            바나바 활동 상태를 변경하겠습니까?
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
              onClick={() => mutate.mutate({barnabaId, isActive})}
            >
              변경
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarnabasInActiveButton;
