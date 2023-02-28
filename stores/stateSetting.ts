import { atom } from "recoil";
import { Theme } from "../interface/setting";

export const stateSetting = atom({
  key: "MAIN/SETTING",
  default: {
    theme: Theme.default,
    cellSelectedCategoryId: 0,
    newFamilySelectedCategoryId: 0,
  },
});
