import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {registerBarnaba} from "../../firebase/Barnabas/barnabas";
import {handleMutationError} from "../../utils/errorUtils";

export const useRegisterBarnaba = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(registerBarnaba, {
    onSuccess: () => {
      toast.success("모든 바나바 프로필이 성공적으로 저장되었습니다.");
      queryClient.refetchQueries(["getGroupedDataByCohort"]);
      queryClient.refetchQueries(["getGroupedBarnabasByAge"]);
    },
    onError: (error) => {
      handleMutationError(
        error,
        "바나바 데이터를 저장하는 중 에러가 발생했습니다"
      );
    },
  });

  return mutation;
};
