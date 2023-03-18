import { atom } from "recoil";
import { Member } from "../interface/user";

export const selectedUser = atom<Member | null>({
  key: "HOME/SELECTED_USER",
  default: null,
});
