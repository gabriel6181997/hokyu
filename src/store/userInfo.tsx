import { atom, useRecoilState } from 'recoil'
import { auth, db } from "src/firebase";
import { useEffect } from "react";

type UserInfo = {
  name: string,
  username: string,
  profileImageFile: string
}

const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {name: "unknown", username: "unknown", profileImageFile: "no picture"},
})

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const user = auth.currentUser;

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

  console.log(userInfo);
}
