import React from "react";
import { AttendanceCheckStatus, FindAttendanceCheckQuery, FindCellWithTranferDataQuery } from "../../../../graphql/generated";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../Atoms/Skeleton/SkeletonListItem";
import TransferInListItem from "../../../Blocks/ListItems/TransferInListItem";
import TransferOutListItem from "../../../Blocks/ListItems/TransferOutListItem";

interface TransferConfirmProps {
  data: FindCellWithTranferDataQuery | undefined;
  isLoading: boolean;
  isAttendanceLoading: boolean;
  isAttendanceFetching: boolean;
  attendanceStatus: FindAttendanceCheckQuery | undefined
}

const TransferConfirm = ({ data, isLoading, isAttendanceLoading, isAttendanceFetching, attendanceStatus }: TransferConfirmProps) => {
  return (
    <div className="pb-24 bg-white">
      {isAttendanceLoading || isAttendanceFetching ? (
        <SkeletonListItem />
      ) : (
        <>
          {attendanceStatus && attendanceStatus.attendanceCheck === AttendanceCheckStatus.Completed ? (
            <>
              <div className="">
                <h3 className="text-3xl font-poppins mb-1">Transfer In</h3>
                <p className="text-base pb-4">
                  다른셀에서 우리셀로 이동 요청한 상태를 보여줍니다
                  <br />
                </p>
                <div className="w-full h-[1px] bg-gray-600"></div>
                <div className="mt-8 flex flex-col gap-6">
                  {isLoading ? (
                    <SkeletonListItem />
                  ) : data &&
                    data.findCell.transfersIn.filter(
                      (item) => item.status === "ORDERED"
                    ).length !== 0 ? (
                    data.findCell.transfersIn
                      .filter((item) => item.status === "ORDERED")
                      .map((item) => <TransferInListItem key={item.id} data={item} />)
                  ) : (
                    <EmptyStateSimple />
                  )}
                </div>
              </div>
              <div className="mt-32">
                <h3 className="text-3xl font-poppins mb-1">Transfer Out</h3>
                <p className="text-base pb-4">
                  우리셀에서 다른셀로 이동 요청한 상태를 보여줍니다
                  <br />
                  승인대기 상태인 요청건만 보여줍니다. (승인 | 거절은 이동결과에서
                  확인하세요)
                </p>
                <div className="w-full h-[1px] bg-gray-600"></div>
                <div className="mt-8 flex flex-col gap-6">
                  {isLoading ? (
                    <SkeletonListItem />
                  ) : data &&
                    data.findCell.transfersOut.filter(
                      (item) => item.status === "ORDERED"
                    ).length !== 0 ? (
                    data.findCell.transfersOut
                      .filter((item) => item.status === "ORDERED")
                      .map((item) => <TransferOutListItem key={item.id} data={item} />)
                  ) : (
                    <EmptyStateSimple />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex justify-center items-center mt-6 pt-24">
              <p className="whitespace-pre-line text-center">
                {`아직 셀리더들이 출석체크 중입니다.\n`}
                {`출석체크가 마감 된 후 새가족 셀편성을 진행해주세요.`}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransferConfirm;
