//Import Libraries
import Image from "next/image";
import { useRouter } from "next/router";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

//Import Components
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { testUser } from "src/config/testuser";
import { auth } from "src/firebase";

type Login = {
  email: string;
  password: string;
}

const IndexPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleLogin = async (e: Login) => {
    await auth
      .signInWithEmailAndPassword(e.email, e.password)
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        alert("入力された情報と登録された情報は一致しません");
      });
  };

  const handleTestLogin = async (e: React.SyntheticEvent) => {
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

        <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
          <div className="w-72 mx-auto">
            <Input
              type="email"
              placeholder="メールアドレス"
              variant="underlined"
              {...register("email", {
                required: "メールアドレスを入力してください！",
              })}
            />
          </div>

          <div className="text-rose-600 font-bold">
            <ErrorMessage errors={errors} name="email" />
          </div>

          <div className="w-72 mx-auto mt-3">
            <Input
              type="password"
              placeholder="パスワード"
              variant="underlined"
              {...register("password", {
                required: "パスワードを入力してください！",
              })}
            />
          </div>

          <div className="text-rose-600 font-bold">
            <ErrorMessage errors={errors} name="password" />
          </div>

          <div className="mt-5">
            <PrimaryButton
              button
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
            >
              ログイン
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-3">
          <div className="mt-3">
            <PrimaryButton
              button
              className="px-12 py-2 my-1 text-xl"
              variant="solid"
              onClick={handleTestLogin}
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
