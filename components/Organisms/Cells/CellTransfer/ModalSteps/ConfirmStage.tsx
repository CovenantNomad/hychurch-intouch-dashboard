import dayjs from "dayjs";
import React from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
// states
import { useRecoilState } from "recoil";
import graphlqlRequestClient from "../../../../../client/graphqlRequestClient";
import {
  CreateUserCellTransferBulkMutationVariables,
  useCreateUserCellTransferBulkMutation,
} from "../../../../../graphql/generated";
import {
  userTransferInfoState,
  userTransferListState,
} from "../../../../../stores/userTransferState";
import { getTodayString } from "../../../../../utils/dateUtils";
import { makeErrorMessage } from "../../../../../utils/utils";

interface ConfirmStageProps {}

const ConfirmStage = ({}: ConfirmStageProps) => {
  const queryClient = useQueryClient();
  const [transferInfo, setTransferInfo] = useRecoilState(userTransferInfoState);
  const now = dayjs();

  const { mutate } =
    useCreateUserCellTransferBulkMutation<CreateUserCellTransferBulkMutationVariables>(
      graphlqlRequestClient,
      {
        onSuccess(data, variables, context) {
          toast.success("셀원이동 신청이 접수되었습니다.");
          setTransferInfo(null);
          queryClient.invalidateQueries("findCellWithTranferData");
        },
        onError(error) {
          if (error instanceof Error) {
            toast.error(
              `셀원이동 신청에 실패했습니다.\n${makeErrorMessage(
                error.message
              )}`
            );
          }
        },
      }
    );

  const onSubmitHandler = () => {
    try {
      if (transferInfo !== null) {
        const submitList = [
          {
            userId: transferInfo.user.userId,
            fromCellId: transferInfo.from.cellId,
            toCellId: transferInfo.to.cellId,
          },
        ];

        const submitData = {
          CreateUserCellTransferInputs: submitList,
          orderDate: getTodayString(dayjs()),
        };

        mutate({
          input: {
            createUserCellTransferInputs:
              submitData.CreateUserCellTransferInputs,
            orderDate: submitData.orderDate,
          },
        });
      }
    } catch {
      return;
    }
  };

  return (
    <div className="mt-14 mb-6">
      <p className="text-sm text-center">
        내용을 확인하신 후<br />
        생성하기 버튼을 눌러 셀원이동을 신청해주세요
        <br />
        수정하실내용이 있으면 뒤로가기 버튼을 눌러주세요
      </p>
      <div className="mt-8 flex flex-col justify-center">
        <div className="mb-4">
          <p className="text-slate-500 text-sm mb-1 ">이름</p>
          <p className="px-2 py-2 border rounded-md">
            {transferInfo?.user.name}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 grid-flow-row">
          <div className="col-span-1">
            <p className="text-slate-500 text-sm mb-1">보내는 셀</p>
            <p className="px-2 py-2 border rounded-md">
              {transferInfo?.from.name}
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-slate-500 text-sm mb-1">보낼 셀</p>
            <p className="px-2 py-2 border rounded-md">
              {transferInfo?.to.name}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <button
          onClick={onSubmitHandler}
          className="w-full py-3 rounded-lg bg-teal-600 text-center text-white"
        >
          이동하기
        </button>
      </div>
    </div>
  );
};

export default ConfirmStage;
