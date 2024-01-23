import React from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  UserCellTransferStatus,
  useUpdateUserCellTransferMutation,
} from "../../../graphql/generated";
import { GraphQLError } from "graphql-request/dist/types";
import { SpecialCellIdType, transferedUser } from "../../../interface/cell";
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
      if (
        !data.updateUserCellTransfer.userCellTransfer.fromCell.id.includes(
          SpecialCellIdType.Blessing
        ) ||
        !data.updateUserCellTransfer.userCellTransfer.fromCell.id.includes(
          SpecialCellIdType.Renew
        ) ||
        !data.updateUserCellTransfer.userCellTransfer.fromCell.id.includes(
          SpecialCellIdType.NewFamily
        )
      ) {
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
      }
      if (
        !data.updateUserCellTransfer.userCellTransfer.toCell.id.includes(
          SpecialCellIdType.Blessing
        ) ||
        !data.updateUserCellTransfer.userCellTransfer.toCell.id.includes(
          SpecialCellIdType.Renew
        ) ||
        !data.updateUserCellTransfer.userCellTransfer.toCell.id.includes(
          SpecialCellIdType.NewFamily
        )
      ) {
        queryClient.invalidateQueries({
          queryKey: [
            "findCell",
            {
              id: Number(
                data.updateUserCellTransfer.userCellTransfer.toCell.id
              ),
            },
          ],
        });
      }
      if (
        data.updateUserCellTransfer.userCellTransfer.fromCell.id ===
          SpecialCellIdType.Renew ||
        data.updateUserCellTransfer.userCellTransfer.toCell.id ===
          SpecialCellIdType.Renew
      ) {
        queryClient.invalidateQueries({ queryKey: ["findRenewCell"] });
      }
      if (
        data.updateUserCellTransfer.userCellTransfer.fromCell.id ===
          SpecialCellIdType.NewFamily ||
        data.updateUserCellTransfer.userCellTransfer.toCell.id ===
          SpecialCellIdType.NewFamily
      ) {
        queryClient.invalidateQueries({ queryKey: ["findNewFamilyCell"] });
      }

      if (
        data.updateUserCellTransfer.userCellTransfer.fromCell.id ===
          SpecialCellIdType.Blessing ||
        data.updateUserCellTransfer.userCellTransfer.toCell.id ===
          SpecialCellIdType.Blessing
      ) {
        queryClient.invalidateQueries({ queryKey: ["findBlessingCell"] });
      }

      queryClient.invalidateQueries({
        queryKey: ["findUser", { id: data.updateUserCellTransfer.userCellTransfer.user.id }],
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
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center py-6 px-8 rounded-lg shadow-md border bg-white">
      <div className="col-span-2 flex items-baseline">
        <h4 className="text-2xl font-bold mr-2">
          {data.user.name}
        </h4>
        <span className="inline-block text-gray-500 text-lg">
          {data.user.gender === "MAN" ? "형제" : "자매"}
        </span>
      </div>
      <div className="col-span-3 flex items-center mt-4 lg:flex-col lg:mt-0">
        <span className="flex-grow-[1] text-gray-500 text-lg">이동현황</span>
        <p className="flex-grow-[4] text-lg pl-4 lg:mt-2 lg:pl-0">
          <span>{data.fromCell.name}</span>
          <span className="inline-block px-2">→</span>
          <span>{data.toCell.name}</span>
        </p>
      </div>
      <div className="col-span-3 flex items-center mt-2 lg:flex-col lg:mt-0">
        <span className="flex-grow-[1] text-gray-500 text-lg">요청일</span>
        <p className="flex-grow-[4] text-lg pl-4 lg:mt-2 lg:pl-0">
          {data.orderDate}
        </p>
      </div>
      <div className="col-span-4 mt-6 flex gap-x-4 lg:mt-0">
        <div className="flex-grow">
          <button
            onClick={() => onCanceledHandler(data.id)}
            className="w-full border border-blue-600 text-black px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
          >
            거절
          </button>
        </div>
        <div className="flex-grow">
          <button
            onClick={() => onConfirmHandler(data.id)}
            className="w-full border border-blue-600 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            승인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferInListItem;
