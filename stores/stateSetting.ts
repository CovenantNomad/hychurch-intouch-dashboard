import {atom} from "recoil";
import {Theme} from "../interface/setting";

export const stateSetting = atom({
  key: "MAIN/SETTING",
  default: {
    theme: Theme.default,
    attendanceSelectedCategoryId: 0,
    cellMeetingSelectedCategoryId: 0,
    cellSelectedCategoryId: 0,
    newFamilySelectedCategoryId: 0,
    blessingSelectedCategoryId: 0,
    renewSelectedCategoryId: 0,
    reportSelectedCategoryId: 0,
    talentSelectedCategoryId: 0,
    developSelectedCategoryId: 0,
  },
});
