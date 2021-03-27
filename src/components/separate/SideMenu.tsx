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

  if(user){
    useEffect(() => {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.data());
        });
    }, []);
  }

  return (
    <aside className="flex flex-col ml-auto w-48 sticky h-screen top-0">
      <div className="ml-2 py-7 text-center flex items-center">
        <Image src="/img/logo.png" alt="logo" width={50} height={50}/>
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

      <div className="mt-auto mb-5 mx-auto">
        <PrimaryButton
          button
          className="px-1 py-1"
          variant="ghost"
          onClick={() => { alert("Logout")}}
        >
          <img
            src={userInfo?.profileImageFile}
            alt="profile-picture"
            className="rounded-full w-11 h-11"
          />
          <div className="pl-2 text-left">
            <p className="font-bold dark:text-white ">{userInfo?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{userInfo?.username}</p>
          </div>
          <p className="mb-4 text-xl  ml-3 mr-2 dark:text-white">…</p>
        </PrimaryButton>
      </div>
    </aside>
  );
};
