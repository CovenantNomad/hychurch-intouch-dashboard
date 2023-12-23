import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindBlessingCellQuery,
  FindBlessingCellQueryVariables,
  useFindBlessingCellQuery,
  UserCellTransferStatus,
} from "../../../../graphql/generated";
import { SpecialCellIdType } from "../../../../interface/cell";
import { Member, MemberWithTransferOut } from "../../../../interface/user";
import { getTodayString } from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import MenteeListSection from "../../../Organisms/Blessing/MenteeListSection";

interface MenteeManagementProps {}

const MenteeManagement = ({}: MenteeManagementProps) => {
  const now = dayjs();
  const [blessingList, setBlessingList] = useState<MemberWithTransferOut[]>([]);
  const [datafilter, setDatafilter] = useState({
    min: getTodayString(dayjs(now.set("year", -1))),
    max: getTodayString(now),
  });
  const { isLoading, data } = useFindBlessingCellQuery<
    FindBlessingCellQuery,
    FindBlessingCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.Blessing),
      transferOutStatus: [UserCellTransferStatus.Ordered],
      transferOutDateFilter: {
        between: {
          min: datafilter.min,
          max: datafilter.max,
        },
      },
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data) {
      const blessingTemp = data.findCell.members.filter(
        (item) => item.roles.length === 0
      );
      const blessingWithTransfer = blessingTemp.map((member) => {
        let findInfo = data.findCell.transfersOut.find(
          (item) => item.user.id === member.id
        );
        return data.findCell.transfersOut.find(
          (item) => item.user.id === member.id
        )
          ? {
              ...member,
              transferStatus: findInfo?.status,
              toCellId: findInfo?.toCell.id,
              toCellName: findInfo?.toCell.name,
              orderDate: findInfo?.orderDate,
            }
          : member;
      });
      setBlessingList(blessingWithTransfer);
    }
  }, [data]);

  return (
    <>
      <BlockContainer firstBlock>
        <MenteeListSection memberList={blessingList} />
      </BlockContainer>
    </>
  );
};

export default MenteeManagement;
