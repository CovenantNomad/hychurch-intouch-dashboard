import { LoginUser } from "../interface/login";
import { atom } from "recoil";

export const userState = atom<LoginUser | null>({
  key: "MAIN/USER_INFO",
  default: null,
});
