import dayjs from "dayjs";
import {useState} from "react";
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
import {SpecialCellIdType} from "../../../../interface/cell";
import {getMostRecentSunday, getTodayString} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import HorizontalTabs from "../../../Atoms/Tabs/HorizontalTabs";
import TransferConfirm from "../../../Organisms/Cells/CellTransfer/TransferConfirm";
import TransferHistory from "../../../Organisms/Cells/CellTransfer/TransferHistory";

interface RenewTransferProps {}

const RenewTransfer = ({}: RenewTransferProps) => {
  const now = dayjs();
  const recentSunday = getMostRecentSunday();
  const [selectedTab, setSelectedTab] = useState(0);
  const [datefilter, setDatefilter] = useState({
    min: getTodayString(now.subtract(1, "month")),
    max: getTodayString(now),
  });
  const {data, isLoading} = useFindCellWithTranferDataQuery<
    FindCellWithTranferDataQuery,
    FindCellWithTranferDataQueryVariables
  >(graphlqlRequestClient, {
    id: Number(SpecialCellIdType.Renew),
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
  });

  const {isLoading: isAttendanceLoading, data: attendanceStatus} =
    useFindAttendanceCheckQuery<
      FindAttendanceCheckQuery,
      FindAttendanceCheckQueryVariables
    >(
      graphlqlRequestClient,
      {
        attendanceDate: recentSunday.format("YYYY-MM-DD"),
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
      component: (
        <TransferConfirm
          data={data}
          isLoading={isLoading}
          isAttendanceLoading={isAttendanceLoading}
          attendanceStatus={attendanceStatus}
        />
      ),
    },
    {
      id: 1,
      name: "이동결과",
      component: (
        <TransferHistory
          data={data}
          isLoading={isLoading}
          datefilter={datefilter}
          setDatefilter={setDatefilter}
        />
      ),
    },
  ];

  return (
    <>
      <BlockContainer firstBlock>
        <h6 className="text-lg font-semibold">새싹셀 편성하기</h6>
        <p className="text-sm text-gray-600 pb-5 mt-1.5">
          새싹셀 청년들을 다른셀로 편성하는 것은 청년들 개인 페이지에서
          진행해주세요
        </p>
        <div className="flex justify-center">
          <HorizontalTabs
            tabs={tabs}
            currentTab={selectedTab}
            setCurrentTab={setSelectedTab}
          />
        </div>
        {tabs[selectedTab].component}
      </BlockContainer>
    </>
  );
};

export default RenewTransfer;
