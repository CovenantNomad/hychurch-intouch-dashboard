import {useState} from "react";
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
import {SimpleMemberWithRole} from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spacer from "../../../Atoms/Spacer";
import Spinner from "../../../Atoms/Spinner";
import AttendanceListSection from "../../../Organisms/SpecialCellsAttendance/AttendanceListSection";
import AttendanceSubmitListSection from "../../../Organisms/SpecialCellsAttendance/AttendanceSubmitListSection";
import SpecialCellAttendanceHeader from "../../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceHeader";
import SpecialCellAttendanceStatusAlert from "../../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceStatusAlert";
import SpecialCellAttendanceUserList from "../../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceUserList";

type BlessingAttendanceProps = {};

const BlessingAttendance = ({}: BlessingAttendanceProps) => {
  const [isOpenAttendanceList, setIsOpenAttendanceList] = useState(false);
  const [searchedMember, setSearchedMember] = useState<
    SimpleMemberWithRole[] | null
  >(null);
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

  const {isLoading: isMeLoading, data: meData} = useMeQuery<
    MeQuery,
    MeQueryVariables
  >(graphlqlRequestClient);

  const {isLoading, data} = useFindNewFamilyCellQuery<
    FindNewFamilyCellQuery,
    FindNewFamilyCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.Blessing),
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <BlockContainer firstBlock>
      {isMeLoading ? (
        <div className="py-6">
          <Spinner />
        </div>
      ) : (
        <>
          {meData ? (
            <>
              {meData.me.cell?.id === SpecialCellIdType.Blessing ||
              meData.me.roles.includes(RoleType.Operator) ? (
                <div>
                  {isLoading ? (
                    <div className="py-6">
                      <Spinner />
                    </div>
                  ) : (
                    <div>
                      {isOpenAttendanceList ? (
                        <AttendanceListSection
                          attendanceList={attendanceList}
                          onRemoveHandler={onRemoveHandler}
                          setIsOpenAttendanceList={setIsOpenAttendanceList}
                          onTemporarySaveHandler={onTemporarySaveHandler}
                          onSubmitHandler={onSubmitHandler}
                          onResetList={onResetList}
                        />
                      ) : (
                        <>
                          {data ? (
                            <div>
                              <SpecialCellAttendanceStatusAlert
                                attendanceStatus={attendanceStatus}
                                cellName={"블레싱셀"}
                              />
                              <Spacer size={"h-6 lg:h-8"} />
                              {attendanceStatus ===
                              AttendanceStatus.COMPLETE ? (
                                <div>
                                  <AttendanceSubmitListSection
                                    attendanceSubmitList={attendanceSubmitList}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <SpecialCellAttendanceHeader
                                    memberList={data.findCell.members}
                                    attendanceList={attendanceList}
                                    setSearchedMember={setSearchedMember}
                                    setIsOpenAttendanceList={
                                      setIsOpenAttendanceList
                                    }
                                  />
                                  <SpecialCellAttendanceUserList
                                    cellName={"블레싱셀"}
                                    memberList={data.findCell.members}
                                    searchedMember={searchedMember}
                                    attendanceList={attendanceList}
                                    setSearchedMember={setSearchedMember}
                                    onSaveAttendanceList={onSaveAttendanceList}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-6">
                              요청하신 데이터가 존재하지 않습니다
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="block text-xl font-bold">STOP! 🖐🏻</span>
                  <span className="block text-xl font-bold mt-1">
                    접근권한이 없습니다
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <span className="block text-xl font-bold">STOP! 🖐🏻</span>
              <span className="block text-xl font-bold mt-1">
                접근권한이 없습니다
              </span>
            </div>
          )}
        </>
      )}
    </BlockContainer>
  );
};

export default BlessingAttendance;
