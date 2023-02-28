import dayjs from "dayjs";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindCellWithTranferDataQuery,
  FindCellWithTranferDataQueryVariables,
  useFindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../graphql/generated";
import { selectedState } from "../../../stores/selectedState";
import { getTodayString } from "../../../utils/dateUtils";
import HorizontalTabs from "../../Atoms/Tabs/HorizontalTabs";
import VerticalTabs from "../../Atoms/Tabs/VerticalTabs";
import TransferConfirm from "../../Organisms/Cells/CellTransfer/TransferConfirm";
import TransferHistory from "../../Organisms/Cells/CellTransfer/TransferHistory";
import TransferProcess from "../../Organisms/Cells/CellTransfer/TransferProcess";

interface CellTransferProps {}

const CellTransferScreen = ({}: CellTransferProps) => {
  const now = dayjs();
  const [selectedTab, setSelectedTab] = useState(0);
  const { selectedCell } = useRecoilValue(selectedState);
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
      id: Number(selectedCell.cellId),
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
    { id: 0, name: "이동신청", component: <TransferProcess /> },
    {
      id: 1,
      name: "이동승인",
      component: <TransferConfirm data={data} isLoading={isLoading} />,
    },
    {
      id: 2,
      name: "이동결과",
      component: <TransferHistory data={data} isLoading={isLoading} />,
    },
  ];

  return (
    <div className="">
      <div className="py-5 px-4 bg-white">
        <h6 className="text-xl font-bold pb-5">셀 편성하기</h6>
        <HorizontalTabs
          tabs={tabs}
          currentTab={selectedTab}
          setCurrentTab={setSelectedTab}
        />
      </div>
      <div className="pb-5 px-5 mt-2 mb-2 rounded-md bg-white">
        {tabs[selectedTab].component}
      </div>
    </div>
  );
};

export default CellTransferScreen;
