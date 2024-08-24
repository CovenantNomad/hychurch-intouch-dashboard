import dayjs from "dayjs";
import "dayjs/locale/ko";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

dayjs.tz.setDefault("Asia/Seoul");

const nowUtc = dayjs.utc();
const todayKST = nowUtc.tz("Asia/Seoul");

export const today = todayKST.toDate();

export const getCurrentDate = () => {
  const thisYear = dayjs(today).get("year");
  const thisMonth = dayjs(today).get("month") + 1;
  const thisDate = dayjs(today).get("date");
  const thisDay = dayjs(today).get("day");

  const firstDayOfMonth = dayjs(`${thisYear}-${thisMonth}-01`, "YYYY-MM-DD");
  const thisWeek = dayjs(today).isoWeek() - firstDayOfMonth.isoWeek() + 1;

  return {thisYear, thisMonth, thisDate, thisDay, thisWeek};
};
