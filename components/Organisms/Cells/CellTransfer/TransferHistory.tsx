import dayjs from "dayjs";
import React, {useState} from "react";
import {
  FindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../../graphql/generated";
import {cx} from "../../../../utils/utils";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../Atoms/Skeleton/SkeletonListItem";
import TransferHistoryListItem from "../../../Blocks/ListItems/TransferHistoryListItem";
import SearchFilterModal from "../../../Blocks/Modals/SearchFilterModal";

interface TransferHistoryProps {
  data: FindCellWithTranferDataQuery | undefined;
  isLoading: boolean;
  datefilter: {
    min: string;
    max: string;
  };
  setDatefilter: React.Dispatch<
    React.SetStateAction<{
      min: string;
      max: string;
    }>
  >;
}

const TransferHistory = ({
  data,
  isLoading,
  datefilter,
  setDatefilter,
}: TransferHistoryProps) => {
  const now = dayjs();
  const [openSearchFilterModal, setOpenSearchFilterModal] = useState(false);
  const [isInTab, setIsInTab] = useState(true);

  return (
    <div className="pb-24 mt-10 bg-white">
      <div className="flex justify-between items-end mb-2">
        <div className="h-13 grid grid-cols-2 justify-center items-center p-1 bg-zinc-100 rounded-lg outline-none">
          <button
            onClick={() => setIsInTab(true)}
            className={cx(
              "px-10 py-2 rounded-lg text-sm",
              isInTab
                ? "bg-white text-[#09090B]"
                : "bg-transparent text-gray-500"
            )}
          >
            IN
          </button>
          <button
            onClick={() => setIsInTab(false)}
            className={cx(
              "px-10 py-2 rounded-lg text-sm",
              !isInTab
                ? "bg-white text-[#09090B]"
                : "bg-transparent text-gray-500"
            )}
          >
            OUT
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <p className="py-2 px-4 border border-gray-200 rounded-md text-sm">
            {datefilter.min.replace("-", ".")} -{" "}
            {datefilter.max.replace("-", ".")}
          </p>
          <div>
            <button
              type="button"
              className="text-sm py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => setOpenSearchFilterModal(true)}
            >
              조회기간 설정
            </button>
          </div>
        </div>
      </div>

      {isInTab ? (
        <div className="border shadow rounded-xl p-6">
          <h3 className="font-semibold mb-1">편입 명단</h3>
          {isLoading ? (
            <div className="mt-3 py-10 border-t">
              <SkeletonListItem />
            </div>
          ) : data &&
            data.findCell.transfersIn.filter(
              (item) => item.status !== "ORDERED"
            ).length !== 0 ? (
            <div className="mt-3 grid grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 border-t gap-x-8">
              {data.findCell.transfersIn
                .filter((item) => item.status !== "ORDERED")
                .sort((a, b) => a.user.name.localeCompare(b.user.name))
                .map((item) => (
                  <TransferHistoryListItem key={item.id} data={item} />
                ))}
            </div>
          ) : (
            <div className="mt-3 py-10 border-t">
              <EmptyStateSimple />
            </div>
          )}
        </div>
      ) : (
        <div className="border shadow rounded-xl p-6">
          <h3 className="font-semibold mb-1">편출 명단</h3>
          {isLoading ? (
            <div className="mt-3 py-10 border-t">
              <SkeletonListItem />
            </div>
          ) : data &&
            data.findCell.transfersOut.filter(
              (item) => item.status !== UserCellTransferStatus.Ordered
            ).length !== 0 ? (
            <div className="mt-3 grid grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 border-t gap-x-8">
              {data.findCell.transfersOut
                .filter((item) => item.status !== "ORDERED")
                .sort((a, b) => a.user.name.localeCompare(b.user.name))
                .map((item) => (
                  <TransferHistoryListItem key={item.id} data={item} />
                ))}
            </div>
          ) : (
            <div className="mt-3 py-10 border-t">
              <EmptyStateSimple />
            </div>
          )}
        </div>
      )}

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
