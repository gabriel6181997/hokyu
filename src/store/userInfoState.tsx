import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "unknown",
    username: "unknown",
    profileImageFile: "no picture",
  },
});
