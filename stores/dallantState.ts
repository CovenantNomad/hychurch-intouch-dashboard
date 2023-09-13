import { atom } from "recoil";
import { CombinedCellDallantType } from "../interface/Dallants";

export const dallantState = atom<CombinedCellDallantType[] | null>({
  key: "DALLANT/CELL_DALLANT",
  default: null,
});