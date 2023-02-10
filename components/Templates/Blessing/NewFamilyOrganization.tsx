import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedState } from "../../../stores/selectedState";
import VerticalTabs from "../../Atoms/Tabs/VerticalTabs";
import TransferProcess from "../../Organisms/Cells/CellTransfer/TransferProcess";

interface NewFamilyOrganizationProps {}

const NewFamilyOrganization = ({}: NewFamilyOrganizationProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { selectedCell } = useRecoilValue(selectedState);
  // const [ datafilter, setDatafilter ] = useState({
  //   min: getTodayString(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
  //   max: getTodayString(new Date())
  // })

  // const { data, isLoading } = useFindCellWithTranferDataQuery<FindCellWithTranferDataQuery, FindCellWithTranferDataQueryVariables>(
  //   graphlqlRequestClient,
  //   {
  //     id: Number(selectedCell.cellId),
  //     transferInStatus: [UserCellTransferStatus.Ordered, UserCellTransferStatus.Confirmed, UserCellTransferStatus.Canceled,],
  //     transferInDateFilter: { "between": {
  //       min: datafilter.min,
  //       max: datafilter.max
  //     }},
  //     transferOutStatus: [UserCellTransferStatus.Ordered, UserCellTransferStatus.Confirmed, UserCellTransferStatus.Canceled,],
  //     transferOutDateFilter: { "between": {
  //       min: datafilter.min,
  //       max: datafilter.max
  //     }}
  //   },
  //   {
  //     staleTime: 5 * 60 * 1000,
  //     cacheTime: 10 * 60 * 1000
  //   }
  // )

  const tabs = [
    { id: 0, name: "신규셀 배정하기", component: <TransferProcess /> },
    // { id: 1, name: "셀리더 승인결과", component: <TransferHistory data={data} isLoading={isLoading} />},
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

export default NewFamilyOrganization;
