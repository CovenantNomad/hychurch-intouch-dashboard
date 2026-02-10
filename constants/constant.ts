import {SpecialCellIdType} from "../interface/cell";
import {getCurrentDate} from "../utils/date";

export const INTOUCH_DASHBOARD_ACCESS_TOKEN = "intouch_dashboard_access_token";
export const INTOUCH_DASHBOARD_USERNAME = "intouch_dashboard_username";
export const INTOUCH_DASHBOARD_USER = "intouch_dashboard_user";

export const FIND_CELL_LIMIT = 100;

const {thisYear} = getCurrentDate();
const isFirst = false;
export const term = `${thisYear}${isFirst ? "FIRST" : "SECOND"}`;
export const termDisplay = `${thisYear} ${isFirst ? "상반기" : "하반기"}`;

export const ALL_ID = "__ALL__" as const;

export const ALL_OPTION = {
  id: ALL_ID,
  name: "전체",
} as const;

export const SPECIAL_KEYS = [
  SpecialCellIdType.NewFamily,
  SpecialCellIdType.NewFamilyTwo,
  SpecialCellIdType.Blessing,
  SpecialCellIdType.Renew,
] as const;
