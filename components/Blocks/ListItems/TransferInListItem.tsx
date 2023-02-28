import { GraphQLError } from "graphql-request/dist/types";
import React from "react";
import { toast } from "react-hot-toast";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  UserCellTransferStatus,
  useUpdateUserCellTransferMutation,
} from "../../../graphql/generated";
import { transferedUser } from "../../../interface/cell";
import { getTransferStatus, makeErrorMessage } from "../../../utils/utils";

interface TransferInListItemProps {
  data: transferedUser;
}

const TransferInListItem = ({ data }: TransferInListItemProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useUpdateUserCellTransferMutation(graphlqlRequestClient, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["findCells"] });
      queryClient.invalidateQueries({ queryKey: ["findCellWithTranferData"] });
      queryClient.invalidateQueries({
        queryKey: [
          "findCell",
          {
            id: Number(data.updateUserCellTransfer.userCellTransfer.toCell.id),
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "findCell",
          {
            id: Number(
              data.updateUserCellTransfer.userCellTransfer.fromCell.id
            ),
          },
        ],
      });
      toast.success(
        `이동요청이 ${getTransferStatus(
          data.updateUserCellTransfer.userCellTransfer.status
        )}되었습니다`
      );
    },
    onError(errors: GraphQLError) {
      console.log(errors);
      toast.error(
        `이동요청이 실패했습니다.\n${makeErrorMessage(errors.message)}`
      );
    },
  });

  const onConfirmHandler = (id: string) => {
    mutate({
      input: {
        id,
        status: UserCellTransferStatus.Confirmed,
      },
    });
  };

  const onCanceledHandler = (id: string) => {
    mutate({
      input: {
        id,
        status: UserCellTransferStatus.Canceled,
      },
    });
  };

  return (
    <div className="bg-white flex justify-between items-center py-6 px-8 rounded-lg shadow-md border">
      <div>
        <h4 className="text-2xl font-bold cursor-pointer">{data.user.name}</h4>
        <span className="inline-block text-gray-500 text-lg mt-1">
          {data.user.gender === "MAN" ? "형제" : "자매"}
        </span>
      </div>
      <div className="flex flex-col justify-start">
        <span className="inline-block text-gray-500 text-lg">이동현황</span>
        <p className="text-lg mt-2">
          <span>{data.fromCell.name}</span>
          <span className="inline-block px-2">→</span>
          <span>{data.toCell.name}</span>
        </p>
      </div>
      <div className="flex flex-col justify-start">
        <span className="inline-block text-gray-500 text-lg">요청일</span>
        <p className="text-lg mt-2">{data.orderDate}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onCanceledHandler(data.id)}
          className="border border-blue-600 text-black px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
        >
          거절
        </button>
        <button
          onClick={() => onConfirmHandler(data.id)}
          className="border border-blue-600 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          승인
        </button>
      </div>
    </div>
  );
};

export default TransferInListItem;
