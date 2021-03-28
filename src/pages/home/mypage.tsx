//Import Libraries
import { useRouter } from "next/router";
import { useState, useEffect, InputHTMLAttributes } from "react";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

//Import Icons
import { FaCamera } from "react-icons/fa";
import { Input } from "src/components/shared/Input";

const myPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<firebase.firestore.DocumentData>();
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (user) {
    useEffect(() => {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setUserInfo(snapshot.data());
        });
    }, []);
  }

  const startEdit = () => {
    setIsEdit(true);
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (_e: any) => {
      const img = document.getElementById("avatar") as HTMLImageElement;
      img.src = _e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setProfileImageFile(file);
  };

  const inputName: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e)  => {
    setName(e.target.value);
  };

  const inputUsername: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setUsername(e.target.value);
  };

  const updateInfo = () => {
    setIsEdit(false);
  };

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
        {isEdit ? (
          <div className="relative w-52 mx-auto">
            <img
              src={userInfo?.profileImageFile ?? "/img/nouserimage.jpg"}
              alt="profile-picture"
              className="mx-auto rounded-full w-52 h-52 object-cover"
              id="avatar"
            />
            <input
              className="z-10 opacity-0 absolute bottom-4 right-9 w-8"
              type="file"
              onChange={handleChange}
            />
            <div
              className="absolute left-2/3 bottom-2  text-xl bg-white border border-gray-700 rounded-full p-2 dark:text-gray-700"
              onClick={handleChange}
            >
              <FaCamera />
            </div>
          </div>
        ) : (
          <img
            src={userInfo?.profileImageFile}
            alt={userInfo?.name}
            className="block mx-auto rounded-full w-52 h-52"
          />
        )}

        <div className="my-6">
        {isEdit? (
          <div className="w-72 mx-auto">
            <Input
            type="text"
            id="name"
            placeholder="名前"
            variant="underlined"
            onChange={inputName}
            />
          </div>
        ): (
          <p className="text-2xl font-bold">{userInfo?.name}</p>
        )}
        </div>
        <div className="mt-2">
        {isEdit? (
          <div className="w-72 mx-auto">
            <Input
            type="text"
            id="username"
            placeholder="ユーザーネーム"
            variant="underlined"
            onChange={inputUsername}
            />
          </div>
        ): (
          <p>{userInfo?.username}</p>
        )}
        </div>

        <div className="flex flex-col">
          <div className="mt-6">
            {isEdit ? (
              <PrimaryButton
                button
                className="px-20 py-2 my-1 text-xl"
                variant="solid"
                onClick={updateInfo}
              >
                更新
              </PrimaryButton>
            ) : (
              <PrimaryButton
                button
                className="px-20 py-2 my-1 text-xl"
                variant="solid"
                onClick={startEdit}
              >
                編集
              </PrimaryButton>
            )}
          </div>
          {isEdit ? null : (
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default myPage;
