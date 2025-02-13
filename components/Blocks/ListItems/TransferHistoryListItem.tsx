import Link from "next/link";
import {useCallback} from "react";
import {UserCellTransferStatus} from "../../../graphql/generated";
import {transferedUser} from "../../../interface/cell";
import {cx, getTransferStatus, makeLinkUrl} from "../../../utils/utils";

interface TransferOutListItemProps {
  data: transferedUser;
}

const TransferHistoryListItem = ({data}: TransferOutListItemProps) => {
  const useTransfromStatus = useCallback(
    (state: UserCellTransferStatus) => getTransferStatus(state),
    []
  );

  return (
    <div className="flex items-center justify-between py-4 px-4 border-b">
      <div className="flex-1">
        <Link
          href={{
            pathname: makeLinkUrl(data),
            query: {
              transferStatus: data.status,
              toCellName: data.toCell.name,
            },
          }}
          as={makeLinkUrl(data)}
        >
          <>
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
          </>
        </Link>
      </div>
      <div className="flex">
        <div className="mr-12">
          <p className="">{data.orderDate}</p>
          <p className="text-sm text-gray-500 text-center mt-1">요청일</p>
        </div>
        <div className="mr-12">
          <p className="">{data.completeDate}</p>
          <p className="text-sm text-gray-500 text-center mt-1">승인일</p>
        </div>
      </div>
      <div
        className={cx(
          "text-white p-4 rounded-full text-center",
          data.status === UserCellTransferStatus.Ordered
            ? "bg-yellow-500 hover:bg-yellow-400"
            : data.status === UserCellTransferStatus.Confirmed
            ? "bg-blue-500 hover:bg-blue-400"
            : "bg-red-500 hover:bg-red-400"
        )}
      >
        {useTransfromStatus(data.status)}
      </div>
    </div>
  );
};

export default TransferHistoryListItem;
