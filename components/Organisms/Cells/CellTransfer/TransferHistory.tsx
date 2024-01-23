import React, { useState } from "react";
import {
  FindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../../graphql/generated";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../Atoms/Skeleton/SkeletonListItem";
import TransferOutListItem from "../../../Blocks/ListItems/TransferOutListItem";
import SearchFilterModal from "../../../Blocks/Modals/SearchFilterModal";
import dayjs from "dayjs";
import TransferHistoryListItem from "../../../Blocks/ListItems/TransferHistoryListItem";

interface TransferHistoryProps {
  data: FindCellWithTranferDataQuery | undefined;
  isLoading: boolean;
  datefilter: {
    min: string;
    max: string;
  }
  setDatefilter: React.Dispatch<React.SetStateAction<{
    min: string;
    max: string;
  }>>
}

const TransferHistory = ({ data, isLoading, datefilter, setDatefilter }: TransferHistoryProps) => {
  const now = dayjs();
  const [openSearchFilterModal, setOpenSearchFilterModal] = useState(false)

  return (
    <div className="pb-24 bg-white">
      <div className="flex justify-between border-b border-gray-300 pb-3">
        <p>
          조회기간 : {' '}
          {datefilter.min.replace('-', '.')} ~{' '}
          {datefilter.max.replace('-', '.')}
        </p>
        <div>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setOpenSearchFilterModal(true)}
          >
            조회기간 설정
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-3xl font-poppins pb-4">받은 청년</h3>
        <div className="w-full h-[1px] bg-gray-600"></div>
        <div className="mt-8 flex flex-col gap-6">
          {isLoading ? (
            <SkeletonListItem />
          ) : data &&
            data.findCell.transfersIn.filter(
              (item) => item.status !== "ORDERED"
            ).length !== 0 ? (
            data.findCell.transfersIn
              .filter((item) => item.status !== "ORDERED")
              .map((item) => <TransferHistoryListItem key={item.id} data={item} />)
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>
      <div className="mt-32">
        <h3 className="text-3xl font-poppins pb-4">보낸 청년</h3>
        <div className="w-full h-[1px] bg-gray-600"></div>
        <div className="mt-8 flex flex-col gap-6">
          {isLoading ? (
            <SkeletonListItem />
          ) : data &&
            data.findCell.transfersOut.filter(
              (item) => item.status !== UserCellTransferStatus.Ordered
            ).length !== 0 ? (
            data.findCell.transfersOut
              .filter((item) => item.status !== "ORDERED")
              .map((item) => <TransferHistoryListItem key={item.id} data={item} />)
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      </div>
      <SearchFilterModal
        open={openSearchFilterModal}
        setOpen={setOpenSearchFilterModal}
        now={now}
        datefilter={datefilter}
        setDateFilter={setDatefilter}
      />
    </div>
  );
};

export default TransferHistory;
