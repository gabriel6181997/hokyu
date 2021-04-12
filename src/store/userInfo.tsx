import { selector } from "recoil";
import { auth, db } from "src/firebase";

export const userInfoData = selector({
  key: "userInfo",
  get: async ({ get }) => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const response = await db.collection("users").doc(user.uid).get();

        let info = {
          name: "unknown",
          username: "unknown",
          profileImageFile: "no picture",
        };

        if (response.exists) {
          info = response.data();
        }

        // console.log(info);
      } else {
        alert("no user!");
        return;
      }
    });
  },
});
