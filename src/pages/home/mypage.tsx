//Import Libraries
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { UserInfo } from "src/components/separate/UserInfo";

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

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      {userInfo ? (
        <UserInfo preloadedValues={userInfo} />
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export default myPage;
