import dayjs from "dayjs";
import React, { useState } from "react";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindCellWithTranferDataQuery,
  FindCellWithTranferDataQueryVariables,
  useFindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../../graphql/generated";
import { SpecialCellIdType } from "../../../../interface/cell";
import { getTodayString } from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import HorizontalTabs from "../../../Atoms/Tabs/HorizontalTabs";
import TransferConfirm from "../../../Organisms/Cells/CellTransfer/TransferConfirm";
import TransferHistory from "../../../Organisms/Cells/CellTransfer/TransferHistory";

interface BlessingTransferProps {}

const BlessingTransfer = ({}: BlessingTransferProps) => {
  const now = dayjs();
  const [selectedTab, setSelectedTab] = useState(0);
  const [datafilter, setDatafilter] = useState({
    min: getTodayString(dayjs(now.set("year", -1))),
    max: getTodayString(now),
  });
  const { data, isLoading } = useFindCellWithTranferDataQuery<
    FindCellWithTranferDataQuery,
    FindCellWithTranferDataQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.Blessing),
      transferInStatus: [
        UserCellTransferStatus.Ordered,
        UserCellTransferStatus.Confirmed,
        UserCellTransferStatus.Canceled,
      ],
      transferInDateFilter: {
        between: {
          min: datafilter.min,
          max: datafilter.max,
        },
      },
      transferOutStatus: [
        UserCellTransferStatus.Ordered,
        UserCellTransferStatus.Confirmed,
        UserCellTransferStatus.Canceled,
      ],
      transferOutDateFilter: {
        between: {
          min: datafilter.min,
          max: datafilter.max,
        },
      },
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const tabs = [
    {
      id: 0,
      name: "이동승인",
      component: <TransferConfirm data={data} isLoading={isLoading} />,
    },
    {
      id: 1,
      name: "이동결과",
      component: <TransferHistory data={data} isLoading={isLoading} />,
    },
  ];

  return (
    <div>
      <BlockContainer firstBlock>
        <h6 className="text-xl font-bold">블레싱 편성하기</h6>
        <p className="pb-5 mt-2">
          블레싱 청년들을 셀에 편성하는 것은 멘티리스트의 개인 페이지에서
          진행해주세요
        </p>
        <HorizontalTabs
          tabs={tabs}
          currentTab={selectedTab}
          setCurrentTab={setSelectedTab}
        />
      </BlockContainer>
      <BlockContainer>{tabs[selectedTab].component}</BlockContainer>
    </div>
  );
};

export default BlessingTransfer;
