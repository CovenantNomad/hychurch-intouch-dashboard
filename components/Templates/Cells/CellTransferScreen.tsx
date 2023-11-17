import dayjs from "dayjs";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindAttendanceCheckQuery,
  FindAttendanceCheckQueryVariables,
  FindCellWithTranferDataQuery,
  FindCellWithTranferDataQueryVariables,
  useFindAttendanceCheckQuery,
  useFindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../graphql/generated";
import { selectedState } from "../../../stores/selectedState";
import { getMostRecentSunday, getTodayString } from "../../../utils/dateUtils";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import SectionContainer from "../../Atoms/Container/SectionContainer";
import HorizontalTabs from "../../Atoms/Tabs/HorizontalTabs";
import SectionTitle from "../../Atoms/Typography/SectionTitle";
import TransferConfirm from "../../Organisms/Cells/CellTransfer/TransferConfirm";
import TransferHistory from "../../Organisms/Cells/CellTransfer/TransferHistory";
import TransferProcess from "../../Organisms/Cells/CellTransfer/TransferProcess";

interface CellTransferProps {}

const CellTransferScreen = ({}: CellTransferProps) => {
  const now = dayjs();
  const recentSunday = getMostRecentSunday()
  const [selectedTab, setSelectedTab] = useState(0);
  const { selectedCell } = useRecoilValue(selectedState);
  const [datefilter, setDatefilter] = useState({
    min: getTodayString(now.subtract(1, 'month')),
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
          min: datefilter.min,
          max: datefilter.max,
        },
      },
      transferOutStatus: [
        UserCellTransferStatus.Ordered,
        UserCellTransferStatus.Confirmed,
        UserCellTransferStatus.Canceled,
      ],
      transferOutDateFilter: {
        between: {
          min: datefilter.min,
          max: datefilter.max,
        },
      },
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const { isLoading: isAttendanceLoading, isFetching: isAttendanceFetching, data: attendanceStatus } = useFindAttendanceCheckQuery<
    FindAttendanceCheckQuery,
    FindAttendanceCheckQueryVariables
  >(
    graphlqlRequestClient,
    {
      attendanceDate: recentSunday.format('YYYY-MM-DD'),
    },
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const tabs = [
    { id: 0, name: "이동신청", component: <TransferProcess isAttendanceLoading={isAttendanceLoading} isAttendanceFetching={isAttendanceFetching} attendanceStatus={attendanceStatus} /> },
    {
      id: 1,
      name: "이동승인",
      component: <TransferConfirm data={data} isLoading={isLoading} isAttendanceLoading={isAttendanceLoading} isAttendanceFetching={isAttendanceFetching} attendanceStatus={attendanceStatus} />,
    },
    {
      id: 2,
      name: "이동결과",
      component: <TransferHistory data={data} isLoading={isLoading} datefilter={datefilter} setDatefilter={setDatefilter}/>,
    },
  ];

  return (
    <SectionContainer>
      <BlockContainer firstBlock>
        <SectionTitle>셀 편성하기</SectionTitle>
        <HorizontalTabs
          tabs={tabs}
          currentTab={selectedTab}
          setCurrentTab={setSelectedTab}
        />
      </BlockContainer>
      <BlockContainer>{tabs[selectedTab].component}</BlockContainer>
    </SectionContainer>
  );
};

export default CellTransferScreen;
