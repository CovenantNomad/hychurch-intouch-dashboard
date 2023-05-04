import dayjs from "dayjs";
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
