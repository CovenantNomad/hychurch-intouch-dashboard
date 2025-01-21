import {atom} from "recoil";

export const selectedYearState = atom({
  key: "NEW_FAMILY/Year_STATE",
  default: new Date().getFullYear(),
});

export const selectedMonthState = atom({
  key: "NEW_FAMILY/MONTH_STATE",
  default: new Date().getMonth() + 1, // 1월은 0부터 시작하므로 +1
});

export const newFamilyListView = atom<{
  isListView: boolean;
  currentPage: number;
  itemsPerPage: number;
  sortKey: "name" | "registrationDate" | "birthday";
  sortOrder: "asc" | "desc";
}>({
  key: "NEW_FAMILY/LISTVIEW", // 고유한 키값
  default: {
    isListView: false,
    currentPage: 1,
    itemsPerPage: 10,
    sortKey: "name",
    sortOrder: "asc",
  },
});
