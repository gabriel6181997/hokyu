//Import Libraries
import Image from "next/image";
import { useRouter } from "next/router";
import type { InputHTMLAttributes} from "react";
import React, { useState } from "react";
//Import Components
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { testUser } from "src/config/testuser";
import {auth} from "src/firebase";


const IndexPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await auth
      .signInWithEmailAndPassword(email, password)
      .then( () => {
        router.push("/home");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        alert("入力された情報と登録された情報が一致しません");
      });
  };

  const testLogin = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    await auth
      .signInWithEmailAndPassword(testUser.email, testUser.password)
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        alert("テストログインに失敗しました");
      });
  };

  const inputEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e)  => {
    setEmail(e.target.value);
  };

  const inputPassword: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className=" mt-3 text-right mr-10  md:mr-20">
        <DarkModeSwitch />
      </div>
      <div className="text-center mt-5 mx-auto">
        <Image src="/img/loginpageimage.png" width={250} height={200} />
        <div className="pl-2 flex items-center w-44 mx-auto mt-5">
          <Image src="/img/logo.png" alt="logo" width={50} height={50} />
          <h1 className="font-custom text-3xl pl-2">Hokyu</h1>
        </div>

        <div className="mt-8">
          <div className="w-72 mx-auto">
            <Input
              type="email"
              id="email"
              placeholder="メールアドレス"
              variant="underlined"
              onChange={inputEmail}
            />
          </div>

          <div className="w-72 mx-auto mt-5">
            <Input
              type="password"
              id="password"
              placeholder="パスワード"
              variant="underlined"
              onChange={inputPassword}
            />
          </div>
        </div>

        <div className="flex flex-col mt-7">
          <div>
            <PrimaryButton
              button
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
              onClick={login}
            >
              ログイン
            </PrimaryButton>
          </div>

          <div className="mt-3">
            <PrimaryButton
              button
              className="px-12 py-2 my-1 text-xl"
              variant="solid"
              onClick={testLogin}
            >
              テストユーザー
            </PrimaryButton>
          </div>

          <div className="mt-3">
            <PrimaryButton
              className="px-3 py-1"
              variant="ghost"
              linkProps={{ href: "/register" }}
            >
              アカウントをお持ちでない方は
              <br />
              こちらへ
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
