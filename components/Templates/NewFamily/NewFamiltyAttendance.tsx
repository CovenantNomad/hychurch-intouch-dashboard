import { useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { 
  FindNewFamilyCellQuery, 
  FindNewFamilyCellQueryVariables, 
  MeQuery, 
  MeQueryVariables, 
  useFindNewFamilyCellQuery, 
  useMeQuery
} from "../../../graphql/generated";
import useAttendanceSubmit from "../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit";
import { SpecialCellIdType } from "../../../interface/cell";
import InformationAlerts from "../../Atoms/Alerts/InformationAlerts";
import BlockContainer from "../../Atoms/Container/BlockContainer";
import Spacer from "../../Atoms/Spacer";
import Spinner from "../../Atoms/Spinner";

import AttendanceListSection from "../../Organisms/SpecialCellsAttendance/AttendanceListSection";
import { SimpleMemberWithRole } from "../../../interface/user";
import { AttendanceStatus } from "../../../interface/attendance";
import AttendanceSubmitList from "../../Organisms/SpecialCellsAttendance/AttendanceSubmitListSection";
import SpecialCellAttendanceUserList from "../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceUserList";
import SpecialCellAttendanceStatusAlert from "../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceStatusAlert";
import SpecialCellAttendanceHeader from "../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceHeader";
import AttendanceSubmitListSection from "../../Organisms/SpecialCellsAttendance/AttendanceSubmitListSection";

type NewFamiltyAttendanceProps = {}

const NewFamiltyAttendance = ({}: NewFamiltyAttendanceProps) => {
  const [ isOpenAttendanceList, setIsOpenAttendanceList ] = useState(false)
  const [ searchedMember, setSearchedMember ] = useState<SimpleMemberWithRole[] | null>(null)
  const { attendanceStatus, attendanceSubmitList, attendanceList, onSaveAttendanceList, onRemoveHandler, onTemporarySaveHandler, onSubmitHandler, onResetList } = useAttendanceSubmit()
  const { isLoading: isMeLoading, isFetching: isMeFetching, data: meData } = useMeQuery<
    MeQuery, MeQueryVariables
  >(
    graphlqlRequestClient,
  )

  const { isLoading, isFetching, data } = useFindNewFamilyCellQuery<
    FindNewFamilyCellQuery,
    FindNewFamilyCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(SpecialCellIdType.NewFamily),
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <BlockContainer firstBlock>
      {isMeLoading || isMeFetching ? (
        <div className="py-6">
          <Spinner />
        </div>
      ) : (
        <>
          {meData ? (
            <>
              {meData.me.cell?.id === SpecialCellIdType.NewFamily ? (
                <div>
                  {isLoading || isFetching ? (
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
                              <InformationAlerts
                                description={`새가족등록 후 출석체크를 진행해주세요`}
                              />
                              <SpecialCellAttendanceStatusAlert attendanceStatus={attendanceStatus} cellName={"새가족셀"}/>
                              <Spacer size={'h-6 lg:h-8'} />
                              {attendanceStatus === AttendanceStatus.COMPLETE ? (
                                <div>
                                  <AttendanceSubmitListSection attendanceSubmitList={attendanceSubmitList} />
                                </div>
                              ) : (
                                <div>
                                  <SpecialCellAttendanceHeader 
                                    memberList={data.findCell.members} 
                                    attendanceList={attendanceList} 
                                    setSearchedMember={setSearchedMember}
                                    setIsOpenAttendanceList={setIsOpenAttendanceList} 
                                  />
                                  <SpecialCellAttendanceUserList
                                    cellName={"새가족셀"} 
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
                            <div className="text-center py-6">요청하신 데이터가 존재하지 않습니다</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="block text-xl font-bold">STOP! 🖐🏻</span>
                  <span className="block text-xl font-bold mt-1">접근권한이 없습니다</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <span className="block text-xl font-bold">STOP! 🖐🏻</span>
              <span className="block text-xl font-bold mt-1">접근권한이 없습니다</span>
            </div>
          )}
        </>
      )}
    </BlockContainer>
  );
};

export default NewFamiltyAttendance;
