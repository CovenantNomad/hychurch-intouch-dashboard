import dayjs, {Dayjs} from "dayjs";
import {useState} from "react";
import {getMostRecentSundayFromDate} from "../../../../../../utils/dateUtils";
import HeaderWithCalendar from "../../../../Cellmeetings/CellMeetingHistory/_components/HeaderWithCalendar";
import MenteeAttendanceTable from "./_components/MenteeAttendanceTable";

type Props = {};

const MenteeAttendance = ({}: Props) => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState<Dayjs>(today);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today);

  const recentSunday = getMostRecentSundayFromDate(selectedDate);

  return (
    <>
      <div
        className={`py-5 px-3 bg-white border-l border-b border-r border-slate-200 rounded-bl-md rounded-br-md lg:px-5`}
      >
        <HeaderWithCalendar
          title={"멘티 예배출석체크"}
          recentSunday={recentSunday.format("YYYY-MM-DD")}
          selectedDate={selectedDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
        />
        <MenteeAttendanceTable recentSunday={recentSunday} />
      </div>
    </>
  );
};

export default MenteeAttendance;
