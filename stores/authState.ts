import { atom } from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    username: "",
    userId: "",
    accessToken: "",
    isLoggedIn: false,
  }
})