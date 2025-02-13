import {useCallback} from "react";
import {UserCellTransferStatus} from "../../../graphql/generated";
import {transferedUser} from "../../../interface/cell";
import {getTransferStatus} from "../../../utils/utils";

interface TransferOutListItemProps {
  data: transferedUser;
}

const TransferOutListItem = ({data}: TransferOutListItemProps) => {
  const useTransfromStatus = useCallback(
    (state: UserCellTransferStatus) => getTransferStatus(state),
    []
  );

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
      <div className="mt-6 md:mt-0">
        <div
          className={`
            ${
              data.status === UserCellTransferStatus.Ordered
                ? "bg-yellow-500"
                : data.status === UserCellTransferStatus.Confirmed
                ? "bg-blue-500"
                : "bg-red-500"
            } 
            ${
              data.status === UserCellTransferStatus.Ordered
                ? "hover:bg-yellow-400"
                : data.status === UserCellTransferStatus.Confirmed
                ? "hover:bg-blue-400"
                : "hover:bg-red-400"
            } 
            text-white px-4 py-2 rounded-md text-center
          `}
        >
          {useTransfromStatus(data.status)}
        </div>
      </div>
    </div>
  );
};

export default TransferOutListItem;
