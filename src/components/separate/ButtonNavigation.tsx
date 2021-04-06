//Import Libraries
import Link from "next/link";
import { useEffect, useState } from "react";
import firebase from "firebase/app";

//Import Components
import { BOTTOM_NAVS } from "src/utils/constants/bottomnav";
import { auth, db } from "src/firebase";

export const ButtonNavigation = () => {
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const user = auth.currentUser;

  // if (user) {
  //   useEffect(() => {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .onSnapshot((snapshot) => {
  //         setUserInfo(snapshot.data());
  //       });
  //   }, []);
  // }

  //↑Cause of Memory Leak

  if(user){
    useEffect(()=>{
      const fetchData = async() => {
         try{
           const response = await db
           .collection("users")
           .doc(user.uid)
           .get();

           let info = {name: "unknown", username: "unknown", profileImageFile: "no picture"}

           if(response.exists) {
             info = response.data()
           }
           setUserInfo(info);
         } catch(error) {
           alert("ユーザーの情報お取得できませんでした！")
         }
      };
      fetchData();
    },[])
  }


  return (
    <>
      <nav className="fixed bottom-0 w-full bg-blue-200 py-2 text-gray-700 dark:text-gray-700">
        <ul className="flex">
          {BOTTOM_NAVS.map((item) => {
            return (
              <li className="flex-1 text-center" key={item.key}>
                <Link href={item.href}>
                  <a className="w-full py-2">
                    <svg
                      className="h-7 w-7 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path strokeWidth={1.2} d={item.icon} />
                    </svg>
                  </a>
                </Link>
                <p className="pt-1 text-sm">{item.label}</p>
              </li>
            );
          })}

          <li className="flex-1 text-center">
            <Link href="/home/mypage">
              <a>
                <img
                  src={userInfo?.profileImageFile}
                  alt={userInfo?.name}
                  className="rounded-full block mx-auto w-7 h-7 "
                />
              </a>
            </Link>
            <p className="text-sm pt-1">マイページ</p>
          </li>
        </ul>
      </nav>
    </>
  );
};
