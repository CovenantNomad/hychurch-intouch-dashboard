import dayjs from "dayjs";
import {TIndividaulCellmeetingData} from "../../../interface/cellMeeting";

type Props = {
  data: TIndividaulCellmeetingData[];
};

// 최근 52주 생성 함수 (매주 일요일 기준, dayjs 사용)
const generateLast52Weeks = () => {
  const today = dayjs(); // 오늘 날짜
  const lastSunday = today.subtract(today.day(), "day"); // 가장 가까운 지난 일요일 계산
  const weeks = [];

  for (let i = 0; i < 52; i++) {
    const sunday = lastSunday.subtract(i, "week"); // i주 전의 일요일 계산
    weeks.push(sunday);
  }

  return weeks.reverse(); // 최신 데이터가 오른쪽으로 오도록 정렬
};

// Timestamp를 dayjs 객체로 변환
const convertTimestampToDayjs = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): dayjs.Dayjs => {
  return dayjs.unix(timestamp.seconds); // seconds를 Unix 시간으로 변환
};

// 날짜를 YYYY-MM-DD 형식으로 변환
const formatDate = (date: dayjs.Dayjs): string => {
  return date.format("YYYY-MM-DD");
};

const WeeklyHeatMap = ({data}: Props) => {
  // 최근 52주 데이터 생성
  const last52Weeks = generateLast52Weeks();

  // 매핑: 데이터의 날짜를 최근 52주에 맞춤
  const weeks = last52Weeks.map((weekDate) => {
    const matchedData = data.find((entry) => {
      const entryDate = convertTimestampToDayjs(entry.baseDate); // Timestamp를 dayjs 객체로 변환
      return formatDate(entryDate) === formatDate(weekDate); // 날짜를 "YYYY-MM-DD"로 비교
    });

    return {
      date: weekDate,
      present: matchedData?.hasAttended || false, // 출석 여부 매핑
      baseDateString: matchedData?.baseDateString || formatDate(weekDate), // 매핑된 데이터가 없으면 기본 날짜 사용
    };
  });

  // 월별로 데이터 그룹화
  const groupedByMonth = weeks.reduce((acc, week) => {
    const monthKey = `${week.date.year()}-${String(
      week.date.month() + 1
    ).padStart(2, "0")}`; // 연도-월 형식으로 키 생성
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(week);
    return acc;
  }, {} as Record<string, typeof weeks>);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <div className="flex space-x-4">
        {/* 각 월을 열로 표시 */}
        {Object.keys(groupedByMonth).map((monthKey) => {
          const monthWeeks = groupedByMonth[monthKey];

          return (
            <div key={monthKey} className="flex flex-col items-center">
              {/* 월 이름 */}
              <div className="mb-2">
                <span className="text-xs text-gray-400">{monthKey}</span>
              </div>
              {/* 해당 월의 주 */}
              <div className="flex flex-col space-y-1">
                {monthWeeks.map((week, index) => (
                  <div
                    key={index}
                    className={`group relative w-4 h-4 rounded ${
                      week.present
                        ? "bg-green-400 hover:bg-green-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {/* Tooltip span */}
                    <span className="absolute left-1/2 -translate-x-1/2 -top-8 text-xs text-black bg-gray-200 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow pointer-events-none">
                      {week.baseDateString}: {week.present ? "참석" : "미참석"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-end mt-4 text-xs text-gray-400">
        <span className="mr-2">미참석</span>
        <div className="flex space-x-1">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <div className="w-4 h-4 bg-green-400 rounded"></div>
        </div>
        <span className="ml-2">참석</span>
      </div>
    </div>
  );
};

export default WeeklyHeatMap;
