import { atom } from "recoil";
import { Theme } from "../interface/setting";

export const stateSetting = atom({
  key: "MAIN/SETTING",
  default: {
    theme: Theme.default,
    cellSelectedCategoryId: 0,
    attendanceSelectedCategoryId: 0,
    newFamilySelectedCategoryId: 0,
    blessingSelectedCategoryId: 0,
    renewSelectedCategoryId: 0,
    reportSelectedCategoryId: 0,
    talentSelectedCategoryId: 0,
  },
});
