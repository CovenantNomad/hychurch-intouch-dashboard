import {useState} from "react";
import {
  AttendanceCheckStatus,
  FindAttendanceCheckQuery,
  FindCellWithTranferDataQuery,
} from "../../../../graphql/generated";
import {cx} from "../../../../utils/utils";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import SkeletonListItem from "../../../Atoms/Skeleton/SkeletonListItem";
import TransferInListItem from "../../../Blocks/ListItems/TransferInListItem";
import TransferOutListItem from "../../../Blocks/ListItems/TransferOutListItem";

interface TransferConfirmProps {
  data: FindCellWithTranferDataQuery | undefined;
  isLoading: boolean;
  isAttendanceLoading: boolean;
  attendanceStatus: FindAttendanceCheckQuery | undefined;
}

const TransferConfirm = ({
  data,
  isLoading,
  isAttendanceLoading,
  attendanceStatus,
}: TransferConfirmProps) => {
  const [isInTab, setIsInTab] = useState(true);

  return (
    <div className="pb-24 mt-10 bg-white">
      {isAttendanceLoading ? (
        <SkeletonListItem />
      ) : (
        <>
          {attendanceStatus &&
          attendanceStatus.attendanceCheck ===
            AttendanceCheckStatus.Completed ? (
            <>
              <div className="flex mb-2">
                <div className="h-13 grid grid-cols-2 justify-center items-center p-1 bg-zinc-100 rounded-lg outline-none">
                  <button
                    onClick={() => setIsInTab(true)}
                    className={cx(
                      "px-10 py-2 rounded-lg text-sm",
                      isInTab
                        ? "bg-white text-[#09090B]"
                        : "bg-transparent text-gray-500"
                    )}
                  >
                    IN
                  </button>
                  <button
                    onClick={() => setIsInTab(false)}
                    className={cx(
                      "px-10 py-2 rounded-lg text-sm",
                      !isInTab
                        ? "bg-white text-[#09090B]"
                        : "bg-transparent text-gray-500"
                    )}
                  >
                    OUT
                  </button>
                </div>
              </div>

              {isInTab ? (
                <div className="border shadow rounded-xl p-6">
                  <h3 className="font-semibold mb-1">
                    현재 셀로 이동가능한 명단
                  </h3>
                  {isLoading ? (
                    <div className="mt-3 py-10 border-t">
                      <SkeletonListItem />
                    </div>
                  ) : data &&
                    data.findCell.transfersIn.filter(
                      (item) => item.status === "ORDERED"
                    ).length !== 0 ? (
                    <div className="mt-3 grid grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 border-t gap-x-8">
                      {data.findCell.transfersIn
                        .filter((item) => item.status === "ORDERED")
                        .map((item) => (
                          <TransferInListItem key={item.id} data={item} />
                        ))}
                    </div>
                  ) : (
                    <div className="mt-3 py-10 border-t">
                      <EmptyStateSimple />
                    </div>
                  )}
                </div>
              ) : (
                <div className="border shadow rounded-xl p-6">
                  <h3 className="font-semibold mb-1">
                    다른 셀로 이동신청한 명단
                  </h3>
                  <p className="text-sm text-gray-600">
                    셀편성 결과는 이동결과 탭에서 확인해주세요.
                  </p>
                  {isLoading ? (
                    <div className="mt-3 py-10 border-t">
                      <SkeletonListItem />
                    </div>
                  ) : data &&
                    data.findCell.transfersOut.filter(
                      (item) => item.status === "ORDERED"
                    ).length !== 0 ? (
                    <div className="mt-3 grid grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 border-t gap-x-8">
                      {data.findCell.transfersOut
                        .filter((item) => item.status === "ORDERED")
                        .map((item) => (
                          <TransferOutListItem key={item.id} data={item} />
                        ))}
                    </div>
                  ) : (
                    <div className="mt-3 py-10 border-t">
                      <EmptyStateSimple />
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex justify-center items-center py-20 border rounded-md">
              <p className="text-sm text-center">
                아직 셀리더들이 출석체크 중입니다. <br />
                출석체크가 마감 된 후 새가족 셀편성을 진행해주세요.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransferConfirm;
