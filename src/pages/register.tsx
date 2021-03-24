//Import Libraries
import Image from "next/image";
import React, { useState } from "react";
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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const inputName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const inputUsername = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const inputEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const inputPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const createAccount = (e: React.SyntheticEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users")
          // if(auth.currentUser === null) return;
          .doc(auth.currentUser.uid)
          .set({
            name:name,
            username:username,
          })
          .catch((error) => {
            alert("ネームとユーザーネームの登録に失敗しました");
          });

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
          <Image src="/img/notoddlerimage.png" width={200} height={200} />
          <button className="absolute left-2/3 bottom-3  text-xl bg-white border border-gray-700 rounded-full p-2 dark:text-gray-700">
            <FaCamera />
          </button>
        </div>

        <p className="mt-5 text-2xl font-bold">新規登録</p>

        <div>
          <div className=" mt-6 space-y-5">
            <div className="w-72 mx-auto">
              <Input
                id="name"
                placeholder="名前"
                variant="underlined"
                onChange={inputName}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="username"
                placeholder="ユーザーネーム"
                variant="underlined"
                onChange={inputUsername}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="email"
                placeholder="メールアドレス"
                variant="underlined"
                onChange={inputEmail}
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="password"
                placeholder="パスワード"
                variant="underlined"
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
