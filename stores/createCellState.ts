import { atom } from "recoil";
import { CreateCellType } from "../interface/cell";

export const createCellState = atom<CreateCellType | null>({
  key: "createCellState",
  default: null,
});
