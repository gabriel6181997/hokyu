//Import Libraries
import { useRouter } from "next/router";
import React, { useState, useEffect, InputHTMLAttributes } from "react";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";

//Import Components
import { auth, db, storage } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { testUser } from "src/config/testuser";
import { Input } from "src/components/shared/Input";
import { UserInfo } from "src/components/separate/UserInfo";

const myPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newProfileImageFile, setNewProfileImageFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
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
