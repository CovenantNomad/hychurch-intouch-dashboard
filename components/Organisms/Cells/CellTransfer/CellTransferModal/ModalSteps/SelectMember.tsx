import React, { useState } from "react";
// states
import { useRecoilState, useRecoilValue } from "recoil";
import { userTransferInfoState } from "../../../../../../stores/userTransferState";
// fetch
import graphlqlRequestClient from "../../../../../../client/graphqlRequestClient";
import {
  FindNewTransferUserQuery,
  FindNewTransferUserQueryVariables,
  RoleType,
  useFindNewTransferUserQuery,
  UserCellTransferStatus,
} from "../../../../../../graphql/generated";
// types
import { SelectedWithCell } from "../../../../../../interface/cell";
// components
import SkeletonTranfer from "../../../../../Atoms/Skeleton/SkeletonTranfer";
import { selectedState } from "../../../../../../stores/selectedState";
import { getTodayString } from "../../../../../../utils/dateUtils";
import dayjs from "dayjs";
// utils

interface SelectMemberProps {}

const SelectMember = ({}: SelectMemberProps) => {
  const now = dayjs();
  const [transferInfo, setTransferInfo] = useRecoilState(userTransferInfoState);
  const { selectedCell } = useRecoilValue(selectedState);
  const [datefilter, setDatefilter] = useState({
    min: getTodayString(dayjs(now.set("year", -1))),
    max: getTodayString(now),
  });

  const { data, isLoading } = useFindNewTransferUserQuery<
    FindNewTransferUserQuery,
    FindNewTransferUserQueryVariables
  >(graphlqlRequestClient, {
    id: Number(selectedCell.cellId),
    transferOutStatus: [
      UserCellTransferStatus.Ordered,
      UserCellTransferStatus.Confirmed,
    ],
    transferOutDateFilter: {
      between: {
        min: datefilter.min,
        max: datefilter.max,
      },
    },
  });

  const handleReset = () => {
    setTransferInfo(null);
  };

  const handleSelect = ({ name, id, cellId, cellName }: SelectedWithCell) => {
    setTransferInfo({
      user: {
        name,
        userId: id,
      },
      from: {
        cellId: cellId,
        name: cellName,
      },
      to: {
        cellId: "",
        name: "",
      },
    });
  };

  return (
    <div className="mt-14 mb-6">
      <div className={`grid grid-cols-4 px-4 items-center border-b mb-6 h-12`}>
        <p className="col-span-1 text-gray-500">이름</p>
        <div className="col-span-3 flex items-center">
          <p
            className={`${
              transferInfo ? "text-black text-base" : "text-gray-400 text-sm"
            }  pointer-events-none flex-1`}
          >
            {transferInfo?.user.name || "보내야하는 셀원을 선택해주세요"}
          </p>
          {transferInfo?.user.name !== "" && (
            <button onClick={handleReset} className="p-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20">
                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      {isLoading ? (
        <SkeletonTranfer />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data?.findCell?.members
            .filter(
              (member) =>
                !member.roles.includes(RoleType.CellLeader) &&
                !data.findCell.transfersOut
                  .map((transferedUser) => transferedUser.status === UserCellTransferStatus.Ordered && transferedUser.user.id)
                  .includes(member.id)
            )
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .map((item) => (
              <button
                key={item.id}
                className="py-2 text-sm bg-teal-600 text-white cursor-pointer lg:text-base"
                onClick={() =>
                  handleSelect({
                    id: item.id,
                    name: item.name,
                    cellId: item.cell?.id || "",
                    cellName: item.cell?.name || "",
                  })
                }
              >
                {item.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectMember;
