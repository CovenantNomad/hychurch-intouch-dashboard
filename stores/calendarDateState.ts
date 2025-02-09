import dayjs from "dayjs";
import {atom} from "recoil";

const today = dayjs();

export const calendarCurrentDateState = atom({
  key: "BARNABA/CALENDAR_CURRENT",
  default: today,
});

export const calendarSelectedDateState = atom({
  key: "BARNABA/CALENDAR_SELECT",
  default: today || null,
});
