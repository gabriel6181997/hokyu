//Import Libraries
import type firebase from "firebase/app";
import { useRouter } from "next/router";
import React, { useEffect,useState } from "react";
import { Layout } from "src/components/separate/Layout";
import { UserInfoEdit } from "src/components/separate/UserInfoEdit";
//Import Components
import { auth, db } from "src/firebase";

const UserInfoEditPage = () => {
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
        <UserInfoEdit preloadedValues={userInfo} />
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export default UserInfoEditPage;
