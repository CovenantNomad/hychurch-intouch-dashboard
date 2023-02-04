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
    { id: 0, name: "셀원이동 신청하기", component: <TransferProcess /> },
    {
      id: 1,
      name: "셀원이동 승인처리",
      component: <TransferConfirm data={data} isLoading={isLoading} />,
    },
    {
      id: 2,
      name: "셀원이동 결과확인",
      component: <TransferHistory data={data} isLoading={isLoading} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12">
      <div className="xl:col-span-3 xl:pr-8">
        <VerticalTabs tabs={tabs} setCurrentTab={setSelectedTab} />
      </div>
      <div className="mt-4 border border-[#e5e5e5] xl:col-span-9 ">
        {tabs[selectedTab].component}
      </div>
    </div>
  );
};

export default CellTransferScreen;
