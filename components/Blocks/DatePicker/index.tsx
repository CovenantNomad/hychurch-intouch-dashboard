import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import dayjs, {Dayjs} from "dayjs";
import {Dispatch, SetStateAction, useMemo, useState} from "react";

type Props = {
  selectedDate: Dayjs | null; // 단일 날짜 모드
  selectedRange: {start: Dayjs | null; end: Dayjs | null}; // 기간 선택 모드
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  onClickDate: (date: Dayjs) => void;
};

export default function DatePicker({
  currentDate,
  selectedDate,
  selectedRange,
  setCurrentDate,
  onClickDate,
}: Props) {
  const [range, setRange] = useState<{start: Dayjs | null; end: Dayjs | null}>({
    start: null,
    end: null,
  });

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

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Dayjs) => {
    if (!range.start || (range.start && range.end)) {
      // 첫 번째 날짜 선택
      setRange({start: date, end: null});
    } else {
      // 두 번째 날짜 선택 (기간 완료)
      if (date.isBefore(range.start)) {
        setRange({start: date, end: range.start});
      } else {
        setRange({start: range.start, end: date});
      }
    }
  };

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
        {days.map((day, index) => {
          const isToday = day.isSame(dayjs(), "day");
          const isSelected = day.isSame(range.start, "day");
          const isRangeStart = range.start && day.isSame(range.start, "day");
          const isRangeEnd = range.end && day.isSame(range.end, "day");
          const isInRange =
            range.start &&
            range.end &&
            day.isAfter(range.start) &&
            day.isBefore(range.end);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`h-[52px] flex flex-col justify-start items-center border-t pt-1 cursor-pointer ${
                day.isSame(currentDate, "month")
                  ? "text-black"
                  : "text-gray-300"
              } ${isInRange ? "bg-green-200" : ""}`}
            >
              <span
                className={`h-6 w-6 flex items-center justify-center rounded-full text-sm font-medium ${
                  isToday
                    ? "bg-rose-500 text-white"
                    : isRangeStart || isRangeEnd
                    ? "bg-emerald-500 text-white"
                    : isSelected
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {day.date()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
