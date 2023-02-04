import { atom } from "recoil";
import { Member } from "../interface/user";

export const selectedUser = atom<Member | null>({
  key: "selectedUser",
  default: null,
});
