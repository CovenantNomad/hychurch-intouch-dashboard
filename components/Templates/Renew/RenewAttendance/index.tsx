import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindNewFamilyCellQuery,
  FindNewFamilyCellQueryVariables,
  MeQuery,
  MeQueryVariables,
  RoleType,
  useFindNewFamilyCellQuery,
  useMeQuery,
} from "../../../../graphql/generated";
import useAttendanceSubmit from "../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit";
import {AttendanceStatus} from "../../../../interface/attendance";
import {SpecialCellIdType} from "../../../../interface/cell";
import InformationAlerts from "../../../Atoms/Alerts/InformationAlerts";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spacer from "../../../Atoms/Spacer";
import Spinner from "../../../Atoms/Spinner";
import AttendanceSubmitListSection from "../../../Organisms/SpecialCellsAttendance/AttendanceSubmitListSection";
import NewSpecialCellAttendance from "../../../Organisms/SpecialCellsAttendance/NewSpecialCellAttendance";
import SpecialCellAttendanceStatusAlert from "../../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceStatusAlert";

type RenewAttendanceProps = {};

const RenewAttendance = ({}: RenewAttendanceProps) => {
  const {
    attendanceStatus,
    attendanceSubmitList,
    attendanceList,
    onSaveAttendanceList,
    onRemoveHandler,
    onTemporarySaveHandler,
    onSubmitHandler,
    onResetList,
  } = useAttendanceSubmit();

  const {
    isLoading: isMeLoading,
    isFetching: isMeFetching,
    data: meData,
  } = useMeQuery<MeQuery, MeQueryVariables>(graphlqlRequestClient);

  const {isLoading, isFetching, data} = useFindNewFamilyCellQuery<
    FindNewFamilyCellQuery,
    FindNewFamilyCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.Renew),
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );

  const hasRenewAccess =
    meData?.me.cell?.id === SpecialCellIdType.Renew ||
    meData?.me.roles.includes(RoleType.Operator);

  if (!hasRenewAccess)
    return (
      <BlockContainer firstBlock>
        <div className="py-6 text-center">
          <span className="block text-xl font-bold">STOP! 🖐🏻</span>
          <span className="mt-1 block text-xl font-bold">
            접근권한이 없습니다
          </span>
        </div>
      </BlockContainer>
    );

  if (isLoading || isFetching || isMeLoading || isMeFetching)
    return (
      <BlockContainer firstBlock>
        <div className="py-6">
          <Spinner />
        </div>
      </BlockContainer>
    );

  return (
    <BlockContainer firstBlock>
      <div>
        <InformationAlerts
          description={`새가족등록 후 출석체크를 진행해주세요`}
        />
        <SpecialCellAttendanceStatusAlert
          attendanceStatus={attendanceStatus}
          cellName={"새싹셀"}
        />
        <Spacer size={"h-6 lg:h-8"} />
        {data ? (
          <>
            {attendanceStatus === AttendanceStatus.COMPLETE ? (
              <AttendanceSubmitListSection
                attendanceSubmitList={attendanceSubmitList}
              />
            ) : (
              <NewSpecialCellAttendance
                people={data.findCell.members}
                attendanceList={attendanceList}
                onTemporarySaveHandler={onTemporarySaveHandler}
                onRemoveHandler={onRemoveHandler}
                onSaveAttendanceList={onSaveAttendanceList}
                onSubmitHandler={onSubmitHandler}
                onResetList={onResetList}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-12 h-12 text-gray-400"
            >
              <path d="M10 10h4v4h-4z" fill="currentColor" />
              <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            <div className="mt-4 space-y-1">
              <p className="text-sm font-semibold text-gray-700">
                데이터를 찾을 수 없습니다
              </p>
              <p className="text-xs text-gray-400">
                다시 시도하거나 새로고침 해주세요
              </p>
            </div>
          </div>
        )}
      </div>
    </BlockContainer>
  );
};

export default RenewAttendance;
