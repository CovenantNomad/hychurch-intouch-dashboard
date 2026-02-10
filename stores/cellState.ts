import {atom} from "recoil";
import {ALL_ID} from "../constants/constant";
import {CellType} from "../interface/cell";

export type CommunityFilterValue = typeof ALL_ID | CellType["community"];

export const communityFilterState = atom<CommunityFilterValue>({
  key: "CELL/COMMUNITY_FILTER",
  default: ALL_ID,
});

export const cellMemberSortState = atom<{
  sortKey: "name" | "registrationDate" | "birthday" | "gender" | "grade";
  sortOrder: "asc" | "desc";
}>({
  key: "CELL/CELL_MEMBER_TABLE", // 고유한 키값
  default: {
    sortKey: "name",
    sortOrder: "asc",
  },
});
