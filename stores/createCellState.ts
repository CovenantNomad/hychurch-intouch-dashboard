import { atom } from "recoil";
import { CreateCellType } from "../interface/cell";

export const createCellState = atom<CreateCellType | null>({
  key: "CELL/CREATE_CELL",
  default: null,
});
