//Import Libraries
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/Layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { testUser } from "src/config/testuser";

const myPage = () => {
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.data());
        });
    } else {
      router.push("/");
    }
  }, []);

  const logout = () => {
    const answer = confirm("ログアウトしますか？");
    if (answer) {
      auth.signOut();
      router.push("/");
    }
  };

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      <div className="text-center mx-auto pt-10">
        <img
          src={userInfo?.profileImageFile}
          alt={userInfo?.name}
          className="block mx-auto rounded-full w-52 h-52 object-fit"
        />

          <p className="text-2xl font-bold py-6">{userInfo?.name}</p>
          <p className="mt-2">{userInfo?.username}</p>

        <div className="flex flex-col">
          {user !== null && user.email === testUser.email ? null : (
            <div className="mt-6">
              <PrimaryButton
                className="px-20 py-2 my-1 text-xl"
                variant="solid"
                linkProps={{ href: "/home/mypage/edit" }}
                >
                編集
              </PrimaryButton>
            </div>
          )}

          <div className="my-4">
            <PrimaryButton
              button
              className="px-12 py-2 my-1 text-xl"
              variant="solid"
              onClick={logout}
            >
              ログアウト
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default myPage;
