//Import Libraries
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//Import Components
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import {auth} from "src/firebase"

//Import Icons
import { FaCamera } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const createAccount = (e: React.SyntheticEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        alert("アカウントを登録しました。ログインしてください");
        router.push("/");

        return authUser.user?.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));
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
              <Input id="name" placeholder="名前" variant="underlined" />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="username"
                placeholder="ユーザーネーム"
                variant="underlined"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="email"
                placeholder="メールアドレス"
                variant="underlined"
              />
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="password"
                placeholder="パスワード"
                variant="underlined"
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
