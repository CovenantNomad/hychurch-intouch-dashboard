import React from "react";
import { FindCellWithTranferDataQuery } from "../../../../graphql/generated";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../Atoms/Skeleton/SkeletonListItem";
import TransferInListItem from "../../../Blocks/ListItems/TransferInListItem";
import TransferOutListItem from "../../../Blocks/ListItems/TransferOutListItem";

interface TransferHistoryProps {
  data: FindCellWithTranferDataQuery | undefined;
  isLoading: boolean;
}

const TransferHistory = ({ data, isLoading }: TransferHistoryProps) => {
  return (
    <div className="px-6 pt-8 py-32 bg-white">
      <div className="">
        <h3 className="text-[32px] font-poppins pb-6">Transfer In</h3>
        <div className="w-full h-[1px] bg-gray-600"></div>
        <div className="mt-8 flex flex-col gap-6">
          {isLoading ? (
            <SkeletonListItem />
          ) : data && data.findCell.transfersIn.length !== 0 ? (
            data.findCell.transfersIn
              .filter((item) => item.status !== "ORDERED")
              .map((item) => <TransferOutListItem key={item.id} data={item} />)
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>
      <div className="mt-32">
        <h3 className="text-[32px] font-poppins pb-6">Transfer Out</h3>
        <div className="w-full h-[1px] bg-gray-600"></div>
        <div className="mt-8 flex flex-col gap-6">
          {isLoading ? (
            <SkeletonListItem />
          ) : data && data.findCell.transfersOut.length !== 0 ? (
            data.findCell.transfersOut
              .filter((item) => item.status !== "ORDERED")
              .map((item) => <TransferOutListItem key={item.id} data={item} />)
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferHistory;
