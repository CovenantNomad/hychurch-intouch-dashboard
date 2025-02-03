import {useState} from "react";
import {getMostRecentSunday} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AttendanceStatisticsHeader from "../../../Organisms/Statistics/AttendanceStatistics/AttendanceStatisticsHeader/AttendanceStatisticsHeader";
import IndividualAttendanceSatus from "../../../Organisms/Statistics/AttendanceStatistics/IndividualAttendanceSatus";
import WorshipAttendanceStatus from "../../../Organisms/Statistics/AttendanceStatistics/WorshipAttendanceStatus";

interface ThisWeekAttendanceProps {}

const ThisWeekAttendance = ({}: ThisWeekAttendanceProps) => {
  const recentSunday = getMostRecentSunday();
  const [isOpen, SetIsOpen] = useState(false);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [selectedCellName, setSelectedCellName] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(
    null
  );

  const onSelectCellHandler = (id: string, name: string) => {
    setSelectedCellId(id);
    setSelectedCellName(name);
    setSelectedMemberId(null);
    setSelectedMemberName(null);
    SetIsOpen(false);
  };

  const onResetCellHandler = () => {
    setSelectedCellId(null);
    setSelectedCellName(null);
    setSelectedMemberId(null);
    setSelectedMemberName(null);
    SetIsOpen(false);
  };

  const onSelectMemberHandler = (id: string, name: string) => {
    SetIsOpen(true);
    setSelectedMemberId(id);
    setSelectedMemberName(name);
  };

  const onResetMemberHandler = () => {
    setSelectedMemberId(null);
    setSelectedMemberName(null);
    SetIsOpen(false);
  };

  return (
    <BlockContainer firstBlock>
      <div className="flex space-x-2 items-baseline mb-6">
        <h4 className="text-xl font-bold">이번주 셀별 예배 출석 명단</h4>
        <span className="text-sm">
          (기준일: {recentSunday.format("YYYY-MM-DD")})
        </span>
      </div>
      <AttendanceStatisticsHeader onSelectHandler={onSelectCellHandler} />
      <div className="grid grid-cols-1 mt-6 lg:grid-cols-3 lg:mt-0">
        <div className="col-span-1 lg:col-span-2 lg:flex-1">
          <WorshipAttendanceStatus
            cellId={selectedCellId}
            cellName={selectedCellName}
            recentSunday={recentSunday}
            onSelectHandler={onSelectMemberHandler}
            onResetHandler={onResetCellHandler}
          />
        </div>
        <div className="col-span-1 lg:flex-1">
          <IndividualAttendanceSatus
            isOpen={isOpen}
            memberId={selectedMemberId}
            memberName={selectedMemberName}
            onResetHandler={onResetMemberHandler}
          />
        </div>
      </div>
    </BlockContainer>
  );
};

export default ThisWeekAttendance;
