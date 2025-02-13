import {GraphQLError} from "graphql-request/dist/types";
import {toast} from "react-hot-toast";
import {useQueryClient} from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  UserCellTransferStatus,
  useUpdateUserCellTransferMutation,
} from "../../../graphql/generated";
import {SpecialCellIdType, transferedUser} from "../../../interface/cell";
import {getTransferStatus, makeErrorMessage} from "../../../utils/utils";

interface TransferInListItemProps {
  data: transferedUser;
}

const TransferInListItem = ({data}: TransferInListItemProps) => {
  const queryClient = useQueryClient();

  const {mutate} = useUpdateUserCellTransferMutation(graphlqlRequestClient, {
    onSuccess: (data) => {
      const transferData = data.updateUserCellTransfer.userCellTransfer;
      const {fromCell, toCell, user, status} = transferData;

      // 📌 특정한 셀 ID들 (제외해야 하는 SpecialCellIdType 리스트)
      const specialCellIds = Object.values(SpecialCellIdType) as string[];

      // ✅ 기본적으로 항상 무효화할 쿼리
      queryClient.invalidateQueries(["findCells"]);
      queryClient.invalidateQueries(["findCellWithTranferData"]);

      // ✅ 특정 셀 ID가 SpecialCellIdType에 속하지 않을 경우만 개별 findCell 무효화
      [fromCell, toCell].forEach((cell) => {
        if (!specialCellIds.includes(cell.id)) {
          queryClient.invalidateQueries({
            queryKey: ["findCell", {id: Number(cell.id)}],
          });
        }
      });

      // ✅ 특정 SpecialCellIdType이 변경된 경우만 개별 무효화
      const affectedSpecialCells = new Set([fromCell.id, toCell.id]);

      if (affectedSpecialCells.has(SpecialCellIdType.Renew)) {
        queryClient.invalidateQueries({queryKey: ["findRenewCell"]});
      }
      if (affectedSpecialCells.has(SpecialCellIdType.NewFamily)) {
        queryClient.invalidateQueries({queryKey: ["findNewFamilyCell"]});
      }
      if (affectedSpecialCells.has(SpecialCellIdType.Blessing)) {
        queryClient.invalidateQueries({queryKey: ["findBlessingCell"]});
      }

      // ✅ 사용자 데이터 업데이트
      queryClient.invalidateQueries({queryKey: ["findUser", {id: user.id}]});

      // ✅ 성공 알림
      toast.success(`이동요청이 ${getTransferStatus(status)}되었습니다`);
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
    <div className="flex items-center justify-between py-4 px-4 border-b">
      <div className="flex-1">
        <p className="text-xl font-semibold">
          {data.user.name}
          <span className="inline-block text-gray-600 font-normal text-sm ml-2">
            {data.user.gender === "MAN" ? "형제" : "자매"}
          </span>
        </p>
        <p className="">
          (<span>{data.fromCell.name}</span>
          <span className="inline-block px-2">→</span>
          <span>{data.toCell.name}</span>)
        </p>
      </div>
      <div className="mr-12">
        <p className="">{data.orderDate}</p>
        <p className="text-sm text-gray-500 text-center mt-1">요청일</p>
      </div>
      <div className="flex gap-x-4 mt-6 md:mt-0">
        <div className="flex-grow">
          <button
            onClick={() => onCanceledHandler(data.id)}
            className="w-full border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
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
