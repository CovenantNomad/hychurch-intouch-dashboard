import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import dayjs, {Dayjs} from "dayjs";
import {Dispatch, SetStateAction, useMemo} from "react";

type Props = {
  selectedDate: Dayjs;
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  onClickDate: (date: Dayjs) => void;
};

export default function Calendar({
  currentDate,
  selectedDate,
  setCurrentDate,
  onClickDate,
}: Props) {
  // 날짜 배열 생성 (useMemo로 최적화)
  const days = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    const startDay = startOfMonth.startOf("week");
    const endDay = endOfMonth.endOf("week");

    const totalDays = endDay.diff(startDay, "day") + 1;
    return Array.from({length: totalDays}, (_, i) => startDay.add(i, "day"));
  }, [currentDate]);

  // 이전 달로 이동
  const handlePrevMonth = () =>
    setCurrentDate((prev) => prev.subtract(1, "month"));

  // 다음 달로 이동
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));

  return (
    <div className="max-w-sm mx-auto">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-6 px-6">
        <button
          onClick={handlePrevMonth}
          className="w-7 h-7 p-0 outline-none ring-0"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="text-base font-medium">
          {currentDate.format("YYYY년 M월")}
        </div>
        <button
          onClick={handleNextMonth}
          className="w-7 h-7 p-0 outline-none ring-0"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
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
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => onClickDate(day)}
            className={`h-[52px] flex flex-col justify-start items-center border-t pt-1 cursor-pointer ${
              day.isSame(currentDate, "month") ? "text-black" : "text-gray-300"
            }`}
          >
            <span
              className={`h-6 w-6 flex items-center justify-center rounded-full text-sm font-medium ${
                day.isSame(dayjs(), "day") // 오늘 날짜
                  ? "bg-rose-500 text-white"
                  : day.isSame(selectedDate, "day") // 선택된 날짜
                  ? "bg-emerald-500 text-white"
                  : ""
              }`}
            >
              {day.date()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
