//Import Libraries
import { useRouter } from "next/router";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

//Import Icons
import { FaCamera } from "react-icons/fa";
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
//Import Components
import { auth, db, storage } from "src/firebase";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
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

  // const inputName: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
  //   setName(e.target.value);
  // };

  // const inputUsername: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
  //   setUsername(e.target.value);
  // };

  // const inputEmail: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
  //   setEmail(e.target.value);
  // };

  // const inputPassword: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
  //   setPassword(e.target.value);
  // };

  // const createAccount = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       const uploadTask = storage
  //         .ref(`profileImageFile/${profileImageFile.name}`)
  //         .put(profileImageFile);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progressValue = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           setProgress(progressValue);
  //         },
  //         // 上記snapshotの部分はuseEffect clean up functionを用いて書き直す必要があります

  //         (error) => {
  //           alert("画像がデータベースにアップロードできませんでした");
  //         },
  //         async () => {
  //           await storage
  //             .ref("profileImageFile")
  //             .child(profileImageFile.name)
  //             .getDownloadURL()
  //             .then((url) => {
  //               if (!auth.currentUser) return;
  //               db.collection("users")
  //                 .doc(auth.currentUser.uid)
  //                 .set({
  //                   name: name,
  //                   username: username,
  //                   profileImageFile: url,
  //                 })
  //                 .catch((error) => {
  //                   alert(
  //                     "ネーム・ユーザーネーム・プロフィール写真の登録に失敗しました"
  //                   );
  //                 });
  //             });
  //           setProgress(0);
  //           setProfileImageFile(null);
  //         }
  //       );

  //       alert("アカウントを登録しました。ログインしてください");
  //       router.push("/");
  //     })
  //     .catch((error) => {return alert("新規登録に失敗しました")});
  // };

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className=" mt-3 text-right mr-10  md:mr-20">
        <DarkModeSwitch />
      </div>

      <form className="text-center mt-7" onSubmit={handleSubmit(onSubmit)}>
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
          <div className=" mt-6 space-y-4">
            <div className="w-72 mx-auto">
              <Input
                id="name"
                placeholder="名前"
                variant="underlined"
                type="text"
                {...register("name", { required: "名前を入力してください！" })}
              />
              <div className="text-rose-600 font-bold">
                <ErrorMessage errors={errors} name="name" />
              </div>
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="username"
                placeholder="ユーザーネーム"
                variant="underlined"
                type="text"
                {...register("username", {
                  required: "ユーザーネームを入力してください！",
                })}
              />
              <div className="text-rose-600 font-bold">
                <ErrorMessage errors={errors} name="username" />
              </div>
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="email"
                placeholder="メールアドレス"
                variant="underlined"
                type="email"
                {...register("email", {
                  required: "メールアドレスを入力してください！",
                })}
              />
              <div className="text-rose-600 font-bold">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>

            <div className="w-72 mx-auto">
              <Input
                id="password"
                placeholder="パスワード"
                variant="underlined"
                type="password"
                {...register("password", {
                  required: "パスワードを入力してください！",
                })}
              />
              <div className="text-rose-600 font-bold">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <PrimaryButton
              button
              type="submit"
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
            >
              登録
            </PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
