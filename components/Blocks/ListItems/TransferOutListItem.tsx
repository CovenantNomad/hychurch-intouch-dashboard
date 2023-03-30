import React, { useCallback } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { UserCellTransferStatus } from "../../../graphql/generated";
import { transferedUser } from "../../../interface/cell";
import { getTransferStatus } from "../../../utils/utils";

interface TransferOutListItemProps {
  data: transferedUser;
}

const TransferOutListItem = ({ data }: TransferOutListItemProps) => {
  const useTransfromStatus = useCallback(
    (state: UserCellTransferStatus) => getTransferStatus(state),
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center py-6 px-8 rounded-lg shadow-md border bg-white">
      <div className="col-span-2 flex items-center lg:items-end">
        <h4 className="text-2xl font-bold cursor-pointer mr-2">
          {data.user.name}
        </h4>
        <span className="inline-block text-gray-500 text-lg">
          {data.user.gender === "MAN" ? "형제" : "자매"}
        </span>
      </div>
      <div className="col-span-4 flex items-center mt-3 lg:flex-col lg:mt-0">
        <span className="flex-grow-[1] text-gray-500 text-lg mr-4 lg:mr-0">
          이동현황
        </span>
        <p className="flex-grow-[4] text-lg lg:mt-2">
          <span>{data.fromCell.name}</span>
          <span className="inline-block px-2">→</span>
          <span>{data.toCell.name}</span>
        </p>
      </div>
      <div className="col-span-4 flex items-center mt-3 lg:flex-col">
        <span className="flex-grow-[1] text-gray-500 text-lg mr-4 lg:mr-0">
          요청일
        </span>
        <p className="flex-grow-[4] text-lg lg:mt-2">{data.orderDate}</p>
      </div>
      <div className="col-span-2 mt-4">
        <div
          className={`
            ${
              data.status === UserCellTransferStatus.Ordered
                ? "bg-yellow-600"
                : data.status === UserCellTransferStatus.Confirmed
                ? "bg-blue-600"
                : "bg-red-600"
            } 
            ${
              data.status === UserCellTransferStatus.Ordered
                ? "hover:bg-yellow-700"
                : data.status === UserCellTransferStatus.Confirmed
                ? "hover:bg-blue-700"
                : "hover:bg-red-700"
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
