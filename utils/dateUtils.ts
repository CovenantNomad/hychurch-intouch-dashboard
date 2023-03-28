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

export const makeWeekAndDate = (dateString: string) => {
  return `${dateString.split("-")[0]}년 ${dateString.split("-")[1]}주 (${
    dayjs(dateString.split("-")[2]).get("M") + 1
  }월 ${dayjs(dateString.split("-")[2]).get("D")}일)`;
};
