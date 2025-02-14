import {eachDayOfInterval, format, isSunday} from "date-fns";
import dayjs, {Dayjs} from "dayjs";

export const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const getTodayString = (date: dayjs.Dayjs) => {
  //yyyy-MM-dd
  return `${date.year()}-${(date.month() + 1)
    .toString()
    .padStart(2, "0")}-${date.date().toString().padStart(2, "0")}`;
};

export const makeObjKeyByWeek = (dateString: string) => {
  return `${dayjs(dateString).year()}-${dayjs(dateString).week()}-${dayjs(
    dateString
  ).startOf("isoWeek")}`;
};

export const getWeek = (dateString: string) => {
  const currentDate = dayjs(dateString).date();
  const firstDay = dayjs(dateString).startOf("month").day();
  const previousMonthfirstDay = dayjs(dateString)
    .subtract(1, "month")
    .startOf("month")
    .day();
  const previousMonthlastDate = dayjs(dateString)
    .subtract(1, "month")
    .endOf("month")
    .date();

  const week = Math.ceil((currentDate + firstDay) / 7);
  let previousMonthLastWeek = 0;
  if (previousMonthfirstDay === 0) {
    previousMonthLastWeek = Math.ceil(
      (previousMonthlastDate + previousMonthfirstDay) / 7
    );
  } else {
    previousMonthLastWeek =
      Math.ceil((previousMonthlastDate + previousMonthfirstDay) / 7) - 1;
  }

  if (firstDay === 0) {
    if (currentDate + firstDay < 8) {
      // 첫날이 주일인 첫주
      return `${dayjs(dateString).year()}-${String(
        dayjs(dateString).month() + 1
      ).padStart(2, "0")}-${week}`;
    } else {
      // 첫날이 주일인 다른주
      return `${dayjs(dateString).year()}-${String(
        dayjs(dateString).month() + 1
      ).padStart(2, "0")}-${week}`;
    }
  } else {
    if (currentDate + firstDay < 8) {
      // 첫날이 주일이 아닌 첫주
      return `${dayjs(dateString).year()}-${String(
        dayjs(dateString).month()
      ).padStart(2, "0")}-${previousMonthLastWeek}`;
    } else {
      // 첫날이 주일이 아닌 다른주
      return `${dayjs(dateString).year()}-${String(
        dayjs(dateString).month() + 1
      ).padStart(2, "0")}-${week - 1}`;
    }
  }
};

export const makeWeekAndDate = (dateString: string) => {
  return `${dateString.split("-")[0]}년 ${
    dateString.split("-")[1]
  }월 ${dateString.split("-")[2].padStart(2, "0")}주`;
};

export const convertSecondToDate = (seconds: number) => {
  return dayjs(seconds * 1000);
};

//가장 최근 주일 구하기
export function getMostRecentSunday() {
  const today = dayjs();
  const currentDayOfWeek = today.day(); // 0은 일요일, 1은 월요일, ..., 6은 토요일

  if (currentDayOfWeek === 0) {
    return today;
  }

  // 현재 요일을 뺌으로써 이번 주 일요일까지의 날짜를 구함
  const mostRecentSunday = today.subtract(currentDayOfWeek, "day");

  return mostRecentSunday;
}

//입력한 날짜로부터 가장 최근 주일 구하기
export function getMostRecentSundayFromDate(date: Dayjs) {
  const dayOfWeek = date.day(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  if (dayOfWeek === 0) {
    return date; // 입력받은 날짜가 일요일이면 그대로 반환
  }

  // 입력받은 날짜에서 요일 수만큼 빼서 가장 최근 일요일 구하기
  const mostRecentSunday = date.subtract(dayOfWeek, "day");

  return mostRecentSunday;
}

// 현재일로부터 과거 몇주간의 일요일을 찾어서 String으로 리턴하는 함수
export function getSearchSundayRange(desiredWeeks: number) {
  // 현재 날짜
  const currentDate = dayjs();

  // 현재 날짜를 기준으로 과거의 일요일을 찾는 함수
  function findLastSunday(date: dayjs.Dayjs, weeks: number) {
    const lastSundays = [];

    for (let i = 0; i < weeks; i++) {
      const lastSunday = date.subtract(i * 7, "day").startOf("week");
      lastSundays.push(lastSunday.format("YYYY-MM-DD"));
    }

    return lastSundays;
  }

  // 과거 일요일 날짜 찾기
  const sundayRange = findLastSunday(currentDate, desiredWeeks);

  // 과거 일요일 날짜 찾기
  const minDate = sundayRange[sundayRange.length - 1];

  const maxDate = getMostRecentSunday().format("YYYY-MM-DD");

  return {
    minDate,
    maxDate,
    sundayRange,
  };
}

// 특정한 날짜구간동안에 주일을 찾아서 String[]로 반환하는 함수
export const getSundayRangeByPeriods = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const allDates = eachDayOfInterval({start: startDate, end: endDate});
  const sundayDates = allDates.filter((date) => isSunday(date));

  let resultList: string[] = [];

  sundayDates.forEach((date) => {
    resultList.push(format(date, "yyyy-MM-dd"));
  });

  return resultList;
};

//해당 월의 몇번째 주인지 알려줌
export function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOffset = (7 - firstDayOfMonth.getDay()) % 7; // Offset to the first Sunday
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() + dayOffset);

  const diff = Math.floor(
    (date.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return diff + 1; // Weeks start from 1
}

// Helper function: Calculate the week of the year
export function getWeekOfYear(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOffset = (7 - firstDayOfYear.getDay()) % 7; // Offset to the first Sunday
  const firstSunday = new Date(firstDayOfYear);
  firstSunday.setDate(firstDayOfYear.getDate() + dayOffset);

  const diff = Math.floor(
    (date.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return diff + 1; // Weeks start from 1
}

// 바나바 소요 기간 계산 (주간단위)
export const getWeeksBetweenDates = (
  startDate: string,
  endDate: string
): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // 날짜 차이를 일(day) 단위로 계산
  const dayDifference = end.diff(start, "day");

  // 7일 미만은 1주차, 이후는 7일 단위로 올림 처리
  return dayDifference < 7 ? 1 : Math.ceil(dayDifference / 7);
};
