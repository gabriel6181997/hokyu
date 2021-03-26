//Import Libraries
import React, { InputHTMLAttributes, useState } from "react";
import { useRouter } from "next/router";

//Import Components
import { auth, db, storage } from "src/firebase";
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

//Import Icons
import { FaCamera } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("");
  const router = useRouter();

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

  const inputName: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setName(e.target.value);
  };

  const inputUsername: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setUsername(e.target.value);
  };

  const inputEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setPassword(e.target.value);
  };

  const createAccount = (e: React.SyntheticEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uploadTask = storage
          .ref(`profileImageFile/${profileImageFile.name}`)
          .put(profileImageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progressValue = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progressValue);
          },
          // 上記snapshotの部分はuseEffect clean up functionを用いて書き直す必要があります

          (error) => {
            alert("画像がデータベースにアップロードできませんでした");
          },
          async () => {
            await storage
              .ref("profileImageFile")
              .child(profileImageFile.name)
              .getDownloadURL()
              .then((url) => {
                if (!auth.currentUser) return;
                db.collection("users")
                  .doc(auth.currentUser.uid)
                  .set({
                    name: name,
                    username: username,
                    profileImageFile: url,
                  })
                  .catch((error) => {
                    alert(
                      "ネーム・ユーザーネーム・プロフィール写真の登録に失敗しました"
                    );
                  });
              });
            setProgress(0);
            setProfileImageFile(null);
          }
        );

        alert("アカウントを登録しました。ログインしてください");
        router.push("/");
      })
      .catch((error) => alert("新規登録に失敗しました"));
  };

  return (
    <>
      <div className=" mt-3 text-right mr-10  md:mr-20">
        <DarkModeSwitch />
      </div>

      <div className="text-center mt-7">
        <div className="relative w-52 mx-auto">
          <img
            src={profileImageFile ?? "/img/nouserimage.jpg"}
            alt="profile-picture"
            className="mx-auto rounded-full border border-gray-700 w-48 h-48 object-cover"
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

        <p className="mt-5 text-2xl font-bold">新規登録</p>

        <div>
          <div className=" mt-6 space-y-5">
            <div className="w-72 mx-auto">
              <Input
                id="name"
                placeholder="名前"
                variant="underlined"
                type="text"
                onChange={inputName}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="username"
                placeholder="ユーザーネーム"
                variant="underlined"
                type="text"
                onChange={inputUsername}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="email"
                placeholder="メールアドレス"
                variant="underlined"
                type="email"
                onChange={inputEmail}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="password"
                placeholder="パスワード"
                variant="underlined"
                type="password"
                onChange={inputPassword}
              />
            </div>
          </div>

          <div className="mt-10">
            <PrimaryButton
              button
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
              onClick={createAccount}
            >
              登録
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
