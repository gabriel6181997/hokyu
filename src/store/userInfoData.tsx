import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { auth, db } from "src/firebase";

// export const userInfoData = selector({
//   key: "userInfo",
//   get: async ({ get }) => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const response = await db.collection("users").doc(user.uid).get();

//         let info = {
//           name: "unknown",
//           username: "unknown",
//           profileImageFile: "no picture",
//         };

//         if (response.exists) {
//           info = response.data();
//         }

//         // console.log(info);
//       } else {
//         alert("no user!");
//       }
//     });
//   },
// });

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "unknown",
    username: "unknown",
    profileImageFile: "no picture",
  },
});

export const GetUserInfoData = () => {
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  useEffect(() => {
    // async () => {
    auth.onAuthStateChanged(async (user) => {
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
        setUserInfoData(info);
        // console.log(userInfoData)
      } else {
        alert("no user!");
      }
    });
    // }
  }, [setUserInfoData]);

};
