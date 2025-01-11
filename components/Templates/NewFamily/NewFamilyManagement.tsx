import dayjs from "dayjs";
import {useEffect, useState} from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindNewFamilyCellWithTransferQuery,
  FindNewFamilyCellWithTransferQueryVariables,
  useFindNewFamilyCellWithTransferQuery,
  UserCellTransferStatus,
} from "../../../graphql/generated";
import {SpecialCellIdType} from "../../../interface/cell";
import {MemberWithTransferOut} from "../../../interface/user";
import {getTodayString} from "../../../utils/dateUtils";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import Spinner from "../../Atoms/Spinner";
import NewFamilyMemberSection from "../../Organisms/NewFamily/NewFamilyMemberSection";

interface NewFamilyManagementProps {}

const NewFamilyManagement = ({}: NewFamilyManagementProps) => {
  const now = dayjs();
  const [newFamilyList, setNewFamilyList] = useState<MemberWithTransferOut[]>(
    []
  );
  const [datafilter, setDatafilter] = useState({
    min: getTodayString(dayjs(now.set("year", -1))),
    max: getTodayString(now),
  });
  const {isLoading, data} = useFindNewFamilyCellWithTransferQuery<
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

  useEffect(() => {
    if (data) {
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
            <NewFamilyMemberSection memberList={newFamilyList} />
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default NewFamilyManagement;
