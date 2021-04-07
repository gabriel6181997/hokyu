import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { PrimaryButton } from "../shared/PrimaryButton";
import { auth, db, storage } from "src/firebase";
import { useRouter } from "next/router";
import { testUser } from "src/config/testuser";
import { Input } from "src/components/shared/Input";

type Inputs = {
  name: string;
  username: string;
  profileImageFile: string;
};

export const UserInfo = ({ preloadedValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: preloadedValues.name,
      username: preloadedValues.username,
    },
  });

  const [isEdit, setIsEdit] = useState(false);
  const [newProfileImageFile, setNewProfileImageFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = React.useState({});
  const user = auth.currentUser;
  const router = useRouter();

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

  const onSubmit = async (data: Inputs) => {
    if (!user) return;

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
          try {
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
              });
          } catch(error) {
            alert("画像の変更に失敗しました");
          };
          setProgress(0);
          setNewProfileImageFile(null);
        }
      )
    }

    await db
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
            src={preloadedValues.profileImageFile}
            alt={preloadedValues.name}
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
                {...register("name")}
              />
            </div>
          ) : (
            <p className="text-2xl font-bold">{preloadedValues.name}</p>
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
                {...register("username")}
              />
            </div>
          ) : (
            <p>{preloadedValues.username}</p>
          )}
        </div>

        <div className="flex flex-col">
          {user !== null && user.email === testUser.email ? null : (
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
    </>
  );
};
