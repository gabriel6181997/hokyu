//Import Libraries
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

const myPage = () => {
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(()=> {
    if (!user){
      router.push('/')
    };
  },[user])

  if(user){
    useEffect(() => {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.data());
        });
    }, []);
  }

  const logout = () => {
    const answer = confirm("ログアウトしますか？");
    if (answer) {
      auth.signOut();
      router.push("/")
    }
  };

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      <div className="text-center mx-auto pt-10">
        <img
          src={userInfo?.profileImageFile}
          alt={userInfo?.name}
          className="block mx-auto rounded-full w-52 h-52"
        />
        <p className="text-2xl font-bold my-6">{userInfo?.name}</p>
        <p className=" mt-2 ">{userInfo?.username}</p>

        <div className="flex flex-col">
          <div className="mt-6">
          <PrimaryButton
            className="px-20 py-2 my-1 text-xl"
            variant="solid"
            linkProps={{ href: "/" }}
          >
            編集
          </PrimaryButton>
          </div>
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
