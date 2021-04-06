//Import Libraries
import Image from "next/image";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { auth, db } from "src/firebase";

//Import Components (or utils)
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { GLOBAL_MENUS } from "src/utils/constants/menu";

//Import Icons
import { BsPencilSquare } from "react-icons/bs";

export const SideMenu = () => {
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const user = auth.currentUser;

  // if(user){
  //   useEffect(() => {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .onSnapshot((snapshot) => {
  //         setUserInfo(snapshot.data());
  //       });
  //   }, [user]);
  // }

  if (user) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await db.collection("users").doc(user.uid).get();

          let info = {
            name: "unknown",
            username: "unknown",
            profileImageFile: "no picture",
          };

          if (response.exists) {
            info = response.data();
          }
          setUserInfo(info);
        } catch (error) {
          alert("ユーザーの情報お取得できませんでした！");
        }
      };
      fetchData();
    }, []);
  }

  //↑Unhandled Runtime Error (Error: Rendered more hooks than during the previous render.)

  return (
    <aside className="flex flex-col ml-auto w-48 sticky h-screen top-0">
      <div className="ml-2 py-7 text-center flex items-center">
        <Image src="/img/logo.png" alt="logo" width={50} height={50} />
        <h1 className="font-custom text-3xl pl-2">Hokyu</h1>
      </div>
      <nav>
        <ul>
          {GLOBAL_MENUS.map(({ icon, label, href }) => (
            <li key={label}>
              <PrimaryButton
                className="px-3 py-3 my-1 text-xl"
                variant="ghost"
                linkProps={{ href: href }}
              >
                <div>{icon}</div>
                <p className="pl-4 font-bold">{label}</p>
              </PrimaryButton>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 pt-6">
        <PrimaryButton
          className="px-8 py-3"
          variant="solid"
          linkProps={{ href: "/home/add" }}
        >
          <BsPencilSquare />
          <p className="pl-3">新規幼児</p>
        </PrimaryButton>
      </div>

      <div className="mt-auto mb-5 mx-auto flex items-center">
        <img
          src={userInfo?.profileImageFile}
          alt={userInfo?.name}
          className="rounded-full w-11 h-11"
        />
        <div className="pl-2 text-left">
          <p className="font-bold dark:text-white ">{userInfo?.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{userInfo?.username}
          </p>
        </div>
      </div>
    </aside>
  );
};
