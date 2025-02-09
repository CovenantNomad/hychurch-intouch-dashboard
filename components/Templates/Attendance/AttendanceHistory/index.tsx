import dayjs, {Dayjs} from "dayjs";
import {useState} from "react";
import {getMostRecentSundayFromDate} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AttendnaceTable from "../../../Organisms/Attendance/AttendanceByCell/AttendnaceTable";
import AttendanceCountTable from "../../../Organisms/Attendance/AttendanceCountTable/AttendanceCountTable";
import HeaderWithCalendar from "../../Cellmeetings/CellMeetingHistory/_components/HeaderWithCalendar";

type AttendanceOverviewProps = {};

const AttendanceHistory = ({}: AttendanceOverviewProps) => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState<Dayjs>(today);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today);

  const recentSunday = getMostRecentSundayFromDate(selectedDate);

  return (
    <BlockContainer firstBlock>
      <HeaderWithCalendar
        title="과거 예배출석 조회"
        recentSunday={recentSunday.format("YYYY-MM-DD")}
        selectedDate={selectedDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setSelectedDate={setSelectedDate}
      />
      <AttendnaceTable recentSunday={recentSunday} />
      <AttendanceCountTable recentSunday={recentSunday} />
    </BlockContainer>
  );
};

export default AttendanceHistory;
