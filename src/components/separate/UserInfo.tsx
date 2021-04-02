import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Input } from "../shared/Input";
import { PrimaryButton } from "../shared/PrimaryButton";

export const UserInfo = ({ preloadedValues }) => {
  const [isEdit, setIsEdit] = useState(false);

  const startEdit = () => {
    setIsEdit(true);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form
        className="text-center mx-auto pt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* {isEdit ? (
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
        )} */}

        <div className="py-6">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <input
                ref={register}
                type="text"
                id="name"
                name="name"
                placeholder="名前"
                className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400"
              />
            </div>
          ) : (
            <p className="text-2xl font-bold">Name of user</p>
          )}
        </div>

        <div className="mt-2">
          {isEdit ? (
            <div className="w-72 mx-auto">
              <input
                ref={register}
                type="text"
                id="username"
                name="username"
                placeholder="ユーザーネーム"
                className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400"
              />
            </div>
          ) : (
            <p>username of user</p>
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
                <button type="submit" className="inline-flex items-center justify-center rounded-full text-white rounded-3x1 shadow-md bg-blue-400 font-bold hover:bg-blue-300 duration-300 px-20 py-2 my-1 text-xl">更新</button>
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
        </div>
      </form>
    </>
  );
};
