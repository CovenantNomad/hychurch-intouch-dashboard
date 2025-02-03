import dayjs, {Dayjs} from "dayjs";
import {useState} from "react";
import {getMostRecentSundayFromDate} from "../../../../utils/dateUtils";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import CellMeetingAttendanceCountTable from "../../../Organisms/Attendance/CellMeetingAttendanceCountTable";
import CellMeetingAttendanceTable from "../../../Organisms/Attendance/CellMeetingAttendanceTable";
import HeaderWithCalendar from "./_components/HeaderWithCalendar";

const CellMeetingHistory = () => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState<Dayjs>(today);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today);

  const recentSunday = getMostRecentSundayFromDate(selectedDate);

  return (
    <BlockContainer firstBlock>
      <HeaderWithCalendar
        recentSunday={recentSunday.format("YYYY-MM-DD")}
        selectedDate={selectedDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setSelectedDate={setSelectedDate}
      />
      <CellMeetingAttendanceTable recentSunday={recentSunday} />
      <CellMeetingAttendanceCountTable recentSunday={recentSunday} />
    </BlockContainer>
  );
};

export default CellMeetingHistory;
