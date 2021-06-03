import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Input } from "src/components/shared/Input";
import { auth, db, storage } from "src/firebase";

import { PrimaryButton } from "../shared/PrimaryButton";

type Inputs = {
  name: string;
  username: string;
  profileImageFile: string;
};

// eslint-disable-next-line react/destructuring-assignment
export const UserInfoEdit = ({preloadedValues}: { preloadedValues: Inputs}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      name: preloadedValues.name,
      username: preloadedValues.username,
    },
  });

  const [newProfileImageFile, setNewProfileImageFile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState({});
  const user = auth.currentUser;
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
              .then(async (url) => {
                if (!user) return;
                await db.collection("users").doc(user.uid).update({
                  profileImageFile: url,
                });
              });
          } catch (error) {
            alert("画像の変更に失敗しました");
          }
          setProgress(0);
          setNewProfileImageFile(null);
        }
      );
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
    router.push("/home/mypage");
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  return (
    <>
      <form
        className="text-center mx-auto pt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            role="button"
            aria-hidden="true"
          >
            <FaCamera />
          </div>
        </div>

        <div className="w-72 mx-auto py-6">
          <Input
            type="text"
            placeholder="名前"
            variant="underlined"
            {...register("name", { required: "名前を入力してください！" })}
          />
          <div className="text-rose-600 font-bold">
            <ErrorMessage errors={errors} name="name" />
          </div>
        </div>

        <div className="w-72 mx-auto mt-2">
          <Input
            type="text"
            placeholder="ユーザーネーム"
            variant="underlined"
            {...register("username", {
              required: "ユーザーネームを入力してください！",
            })}
          />
          <div className="text-rose-600 font-bold">
            <ErrorMessage errors={errors} name="username" />
          </div>
        </div>

        <div className="mt-6">
          <PrimaryButton
            button
            type="submit"
            className="px-20 py-2 my-1 text-xl"
            variant="solid"
          >
            更新
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};
