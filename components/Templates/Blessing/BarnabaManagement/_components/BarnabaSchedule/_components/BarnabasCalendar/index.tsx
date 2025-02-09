import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import dayjs, {Dayjs} from "dayjs";
import {useMemo} from "react";
import {useRecoilState} from "recoil";
import {TGroupedAppointments} from "../../../../../../../../interface/barnabas";
import {
  calendarCurrentDateState,
  calendarSelectedDateState,
} from "../../../../../../../../stores/calendarDateState";
import {cx} from "../../../../../../../../utils/utils";

type Props = {
  groupedAppointments: TGroupedAppointments;
};

const BarnabasCalendar = ({groupedAppointments}: Props) => {
  const [currentDate, setCurrentDate] = useRecoilState(
    calendarCurrentDateState
  );
  const [selectedDate, setSelectedDate] = useRecoilState(
    calendarSelectedDateState
  );

  const handlePrevMonth = () =>
    setCurrentDate((prev: Dayjs) => prev.subtract(1, "month"));

  // 다음 달로 이동
  const handleNextMonth = () =>
    setCurrentDate((prev: Dayjs) => prev.add(1, "month"));

  const days = useMemo(() => {
    const startOfMonth = dayjs(currentDate).startOf("month");
    const endOfMonth = dayjs(currentDate).endOf("month");

    const startDay = startOfMonth.startOf("week");
    const endDay = endOfMonth.endOf("week");

    const totalDays = endDay.diff(startDay, "day") + 1;
    return Array.from({length: totalDays}, (_, i) => startDay.add(i, "day"));
  }, [currentDate]);

  return (
    <div className="mx-auto mt-6">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-center mb-5 px-6">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 flex justify-center items-center bg-transparent border border-gray-300 rounded-md"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div className="text-base font-medium mx-20">
          {dayjs(currentDate).format("YYYY년 M월")}
        </div>
        <button
          onClick={handleNextMonth}
          className="w-8 h-8 flex justify-center items-center bg-transparent border border-gray-300 rounded-md"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-end space-x-4 px-6 mb-1 text-xs">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
          <span>오늘</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-rose-500 mr-1" />
          <span>선택한 날짜</span>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 렌더링 */}
      <div className="grid grid-cols-7 text-center border-b">
        {days.map((day, index) => {
          const dateKey = day.format("YYYY-MM-DD"); // 날짜 키 생성
          const appointmentCount = groupedAppointments[dateKey]?.length || 0;

          return (
            <div
              key={index}
              onClick={() => setSelectedDate(day)}
              className={cx(
                "h-[72px] flex flex-col justify-start items-center border-t pt-1 cursor-pointer",
                day.isSame(currentDate, "month")
                  ? "text-black"
                  : "text-gray-300",
                day.day() === 0 && "text-red-500"
              )}
            >
              <span
                className={cx(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm",
                  day.isSame(dayjs(), "day") // 오늘 날짜
                    ? "bg-blue-500 text-white"
                    : day.isSame(selectedDate, "day") // 선택된 날짜
                    ? "bg-rose-500 text-white"
                    : ""
                )}
              >
                {day.date()}
              </span>
              {appointmentCount > 0 && (
                <div className="text-sm text-gray-500 mt-1">
                  +{appointmentCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarnabasCalendar;
