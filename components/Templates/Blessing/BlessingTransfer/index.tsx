import dayjs from "dayjs";
import React, { useState } from "react";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindAttendanceCheckQuery,
  FindAttendanceCheckQueryVariables,
  FindCellWithTranferDataQuery,
  FindCellWithTranferDataQueryVariables,
  useFindAttendanceCheckQuery,
  useFindCellWithTranferDataQuery,
  UserCellTransferStatus,
} from "../../../../graphql/generated";
import { SpecialCellIdType } from "../../../../interface/cell";
import { getMostRecentSunday, getTodayString } from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import HorizontalTabs from "../../../Atoms/Tabs/HorizontalTabs";
import TransferConfirm from "../../../Organisms/Cells/CellTransfer/TransferConfirm";
import TransferHistory from "../../../Organisms/Cells/CellTransfer/TransferHistory";

interface BlessingTransferProps {}

const BlessingTransfer = ({}: BlessingTransferProps) => {
  const now = dayjs();
  const recentSunday = getMostRecentSunday()
  const [selectedTab, setSelectedTab] = useState(0);
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
      id: Number(SpecialCellIdType.Blessing),
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
    {
      id: 0,
      name: "이동승인",
      component: <TransferConfirm data={data} isLoading={isLoading} isAttendanceLoading={isAttendanceLoading} isAttendanceFetching={isAttendanceFetching} attendanceStatus={attendanceStatus} />,
    },
    {
      id: 1,
      name: "이동결과",
      component: <TransferHistory data={data} isLoading={isLoading} datefilter={datefilter} setDatefilter={setDatefilter} />,
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
