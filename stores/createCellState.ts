import { atom } from "recoil";
import { CreateCellType } from "../interface/cell";

export const createCellState = atom<CreateCellType>({
  key: "createCellState",
  default: {
    cellName: "",
    leader: {
      id: "",
      name: "",
    },
    viceLeader: undefined,
  },
});
