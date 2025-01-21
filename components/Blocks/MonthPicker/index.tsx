import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {useEffect, useRef, useState} from "react";

type Props = {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
};

const MonthPicker = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}: Props) => {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const yearPickerRef = useRef<HTMLDivElement>(null);
  const monthPickerRef = useRef<HTMLDivElement>(null);

  // 현재 날짜
  const now = new Date();

  // 바깥 클릭 감지 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (
      yearPickerRef.current &&
      !yearPickerRef.current.contains(event.target as Node)
    ) {
      setShowYearPicker(false);
    }
    if (
      monthPickerRef.current &&
      !monthPickerRef.current.contains(event.target as Node)
    ) {
      setShowMonthPicker(false);
    }
  };

  // 클릭 이벤트 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 1개월 이동
  const changeMonth = (months: number) => {
    const newMonth = selectedMonth - 1 + months;
    const newYear = selectedYear + Math.floor(newMonth / 12);
    const finalMonth = ((newMonth % 12) + 12) % 12; // 음수 처리

    if (
      newYear < now.getFullYear() ||
      (newYear === now.getFullYear() && finalMonth <= now.getMonth())
    ) {
      setSelectedYear(newYear);
      setSelectedMonth(finalMonth + 1); // 1부터 시작하도록 보정
    }
  };

  // 연도 선택
  const selectYear = (year: number) => {
    if (year <= now.getFullYear()) {
      setSelectedYear(year);
      setShowYearPicker(false);
    }
  };

  // 월 선택
  const selectMonth = (month: number) => {
    const newDate = new Date(selectedYear, month, 1);
    if (newDate <= now) {
      setSelectedMonth(month + 1); // 1부터 시작
      setShowMonthPicker(false);
    }
  };

  // 2015년부터 현재 연도까지 생성
  const generateYears = () => {
    const currentYear = now.getFullYear();
    const startYear = 2015;
    return Array.from(
      {length: currentYear - startYear + 1},
      (_, i) => currentYear - i
    );
  };

  return (
    <div className="flex justify-center items-center space-x-8 relative">
      {/* 좌측 버튼 */}
      <button
        onClick={() => changeMonth(-1)}
        className="flex items-center justify-center p-1 border rounded"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      {/* 현재 연/월 */}
      <div className="flex items-center space-x-2 text-lg font-semibold">
        {/* 연도 */}
        <button
          onClick={() => setShowYearPicker(true)}
          className="text-3xl hover:underline"
        >
          {selectedYear}.
        </button>
        {/* 월 */}
        <button
          onClick={() => setShowMonthPicker(true)}
          className="text-3xl hover:underline"
        >
          {String(selectedMonth).padStart(2, "0")}
        </button>
      </div>

      {/* 우측 버튼 */}
      <button
        onClick={() => changeMonth(1)}
        className="p-1 flex items-center justify-center border rounded"
        disabled={
          new Date(selectedYear, selectedMonth, 1) >
          new Date(now.getFullYear(), now.getMonth(), 1)
        }
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>

      {/* 연도 선택 팝업 */}
      {showYearPicker && (
        <div
          ref={yearPickerRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-4 bg-white border rounded shadow overflow-auto max-h-40"
        >
          <div className="grid grid-cols-3 gap-2">
            {generateYears().map((year) => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className="p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 월 선택 팝업 */}
      {showMonthPicker && (
        <div
          ref={monthPickerRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-4 bg-white border rounded shadow"
        >
          <div className="grid grid-cols-3 gap-2">
            {Array.from({length: 12}, (_, i) => (
              <button
                key={i}
                onClick={() => selectMonth(i)}
                className={`p-2 text-sm font-medium text-gray-700 rounded ${
                  new Date(selectedYear, i, 1) > now
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
                disabled={new Date(selectedYear, i, 1) > now}
              >
                {String(i + 1).padStart(2, "0")}월
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
