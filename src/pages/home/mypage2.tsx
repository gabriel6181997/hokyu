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

//Import Icons
import { FaCamera } from "react-icons/fa";
// import { UserForm } from "src/components/separate/UseForm";

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
    setNewProfileImageFile(file);
  };

  const inputName: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setNewName(e.target.value);
  };

  const inputUsername: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    setNewUsername(e.target.value);
  };

  const updateInfo = () => {
    if (!newName || (!userInfo?.name && !newUsername) || !userInfo?.username) {
      alert("必ず名前とユーザーネームを記入してください");
      return;
    }

    if (!newName || !userInfo?.name) {
      alert("必ず名前を記入してください！");
      return;
    }

    if (!newUsername || !userInfo?.username) {
      alert("必ずユーザーネームを記入してください！");
      return;
    }

    if (newProfileImageFile) {
      const uploadTask = storage
        .ref(`profileImageFile/${newProfileImageFile.name}`)
        .put(newProfileImageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressValue);
        },
        (error) => {
          alert("画像がデータベースにアップロードできませんでした");
        },
        async () => {
          await storage
            .ref("profileImageFile")
            .child(newProfileImageFile.name)
            .getDownloadURL()
            .then((url) => {
              if (!user) return;
              db.collection("users")
                .doc(user.uid)
                .update({
                  profileImageFile: url,
                })
                .catch((error) => {
                  alert("画像の変更に失敗しました");
                });
            });
          setProgress(0);
          setNewProfileImageFile(null);
        }
      );
    }

    if (newName !== userInfo?.name) {
      if (!user) return;
      db.collection("users")
        .doc(user.uid)
        .update({
          name: newName,
        })
        .catch((error) => {
          alert("名前の変更に失敗しました");
        });
    }

    if (newUsername !== userInfo?.username) {
      if (!user) return;
      db.collection("users")
        .doc(user.uid)
        .update({
          username: newUsername,
        })
        .catch((error) => {
          alert("ユーザーの変更に失敗しました");
        });
    }

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
      <form className="text-center mx-auto pt-10">
        {isEdit ? (
          <div className="relative w-52 mx-auto">
            <img
              src={userInfo?.profileImageFile ?? "/img/nouserimage.jpg"}
              alt={userInfo?.name}
              className="mx-auto rounded-full w-52 h-52 object-cover"
              id="avatar"
            />
            <input
              className="z-10 opacity-0 absolute bottom-4 right-9 w-8"
              type="file"
              name="newUserProfile"
              onChange={handleChange}
              // ref={register}
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
            className="block mx-auto rounded-full w-52 h-52 object-fit"
          />
        )}

        <div className="py-6">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <Input
                type="text"
                id="name"
                placeholder="名前"
                variant="underlined"
                onChange={inputName}
                // ref={register}
                // ref={register({ required: true })}
              />
            </div>
          ) : (
            <p className="text-2xl font-bold">{userInfo?.name}</p>
          )}
        </div>
        <div className="mt-2">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <Input
                type="text"
                id="username"
                placeholder="ユーザーネーム"
                variant="underlined"
                onChange={inputUsername}
                // ref={register}
                // ref={register({ required: true })}
              />
            </div>
          ) : (
            <p>{userInfo?.username}</p>
          )}
        </div>

        <div className="flex flex-col">
          {user !== null && user.email === testUser.email ? null : (
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
          )}

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
      </form>
    </Layout>
  );
};

export default myPage;
