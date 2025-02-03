import {atom} from "recoil";

export const barnabaSortState = atom<{
  currentPage: number;
  itemsPerPage: number;
  sortKey: "name" | "cohort" | "birthday" | "gender";
  sortOrder: "asc" | "desc";
}>({
  key: "BARNABA/BARNABA_TABLE", // 고유한 키값
  default: {
    currentPage: 1,
    itemsPerPage: 20,
    sortKey: "name",
    sortOrder: "asc",
  },
});

export const menteeSortState = atom<{
  currentPage: number;
  itemsPerPage: number;
  sortKey: "name" | "registrationDate" | "birthday" | "gender";
  sortOrder: "asc" | "desc";
}>({
  key: "BARNABA/MENTEE_TABLE", // 고유한 키값
  default: {
    currentPage: 1,
    itemsPerPage: 20,
    sortKey: "name",
    sortOrder: "asc",
  },
});
