import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Input } from "../shared/Input";
import { PrimaryButton } from "../shared/PrimaryButton";
import { auth, db, storage } from "src/firebase";
import { useRouter } from "next/router";

type Inputs = {
  name: string;
  username: string;
  profileImageFile:string;
}

export const UserInfo = ({ preloadedValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: preloadedValues,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [submittedData, setSubmittedData] = React.useState({});
  const user = auth.currentUser;
  const router = useRouter();

  const startEdit = () => {
    setIsEdit(true);
  };

  const onSubmit = (data: Inputs) => {
    if (!user) return;
    db
      .collection("users")
      .doc(user.uid)
      .update({
        name: data.name,
        username: data.username,
      })
      .catch((error) => {
        alert("ユーザー情報の変更に失敗しました");
      }),
      setSubmittedData(data);
    setIsEdit(false);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  const logout = () => {
    const answer = confirm("ログアウトしますか？");
    if (answer) {
      auth.signOut();
      router.push("/");
    }
  };

  return (
    <>
      <form
        className="text-center mx-auto pt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isEdit ? (
          <div className="relative w-52 mx-auto">
            <img
              src={preloadedValues.profileImageFile ?? "/img/nouserimage.jpg"}
              alt={preloadedValues.name}
              className="mx-auto rounded-full w-52 h-52 object-cover"
              id="avatar"
            />
            <input
              className="z-10 opacity-0 absolute bottom-4 right-9 w-8"
              type="file"
              // {...register("profileImageFile")}
              // onChange={handleChange}
            />
            <div
              className="absolute left-2/3 bottom-2  text-xl bg-white border border-gray-700 rounded-full p-2 dark:text-gray-700"
              // onClick={handleChange}
            >
              <FaCamera />
            </div>
          </div>
        ) : (
          <img
            src={preloadedValues.profileImageFile}
            alt={preloadedValues.name}
            className="block mx-auto rounded-full w-52 h-52 object-fit"
          />
        )}

        <div className="py-6">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="名前"
                className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400"
              />
            </div>
          ) : (
            <p className="text-2xl font-bold">{preloadedValues.name}</p>
          )}
        </div>

        <div className="mt-2">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <input
                {...register('username')}
                type="text"
                id="username"
                placeholder="ユーザーネーム"
                className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400"
              />
            </div>
          ) : (
            <p>{preloadedValues.username}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mt-6">
            {isEdit ? (
              // <PrimaryButton
              //   button
              //   className="px-20 py-2 my-1 text-xl"
              //   variant="solid"
              // >
              //   更新
              // </PrimaryButton>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full text-white rounded-3x1 shadow-md bg-blue-400 font-bold hover:bg-blue-300 duration-300 px-20 py-2 my-1 text-xl"
              >
                更新
              </button>
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
      </form>
    </>
  );
};
