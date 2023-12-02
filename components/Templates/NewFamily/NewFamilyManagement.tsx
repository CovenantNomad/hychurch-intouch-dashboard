import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindNewFamilyCellWithTransferQuery,
  FindNewFamilyCellWithTransferQueryVariables,
  RoleType,
  useFindNewFamilyCellWithTransferQuery,
  UserCellTransferStatus,
} from "../../../graphql/generated";
import { SpecialCellIdType } from "../../../interface/cell";
import { Member, MemberWithTransferOut } from "../../../interface/user";
import { getTodayString } from "../../../utils/dateUtils";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import Spinner from "../../Atoms/Spinner";
import NewFamilyMemberSection from "../../Organisms/NewFamily/NewFamilyMemberSection";
import NewFamilyTeamSection from "../../Organisms/NewFamily/NewFamilyTeamSection";

interface NewFamilyManagementProps {}

const NewFamilyManagement = ({}: NewFamilyManagementProps) => {
  const now = dayjs();
  const [teamList, setTeamList] = useState<Member[]>([]);
  const [newFamilyList, setNewFamilyList] = useState<MemberWithTransferOut[]>(
    []
  );
  const [datafilter, setDatafilter] = useState({
    min: getTodayString(dayjs(now.set("year", -1))),
    max: getTodayString(now),
  });
  const { isLoading, data } = useFindNewFamilyCellWithTransferQuery<
    FindNewFamilyCellWithTransferQuery,
    FindNewFamilyCellWithTransferQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.NewFamily),
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
      cacheTime: 30 * 60 * 1000,
    }
  );

  console.log(teamList)

  useEffect(() => {
    if (data) {
      const teamTemp = data.findCell.leaders.filter((item) =>
        item.roles.includes(RoleType.ViceLeader)
      );
      setTeamList(teamTemp);
      const newFamilyTemp = data.findCell.members.filter(
        (item) => item.roles.length === 0
      );
      const newFamilyWithTransfer = newFamilyTemp.map((member) => {
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
      setNewFamilyList(newFamilyWithTransfer);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <NewFamilyTeamSection teamList={teamList} />
          </BlockContainer>
          <BlockContainer>
            <NewFamilyMemberSection memberList={newFamilyList} />
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default NewFamilyManagement;
