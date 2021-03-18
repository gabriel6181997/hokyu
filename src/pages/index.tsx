import Image from "next/image";
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

const IndexPage = () => {
  return (
    <>
      <div className=" mt-3 text-right mr-10  md:mr-20">
        <DarkModeSwitch />
      </div>
      <div className="text-center mt-7">
        <Image src="/img/temporary_logo.jpg" width={200} height={200} />
        <p className="mt-5 text-2xl font-bold">ログイン</p>

        <div className="mt-10">
          <div className="w-72 mx-auto">
            <Input
              id="email"
              placeholder="ユーザー名/メールアドレス"
              variant="underlined"
            />
          </div>

          <div className="w-72 mx-auto mt-4">
            <Input
              id="password"
              placeholder="パスワード"
              variant="underlined"
            />
          </div>
        </div>

        <div className="flex flex-col mt-7">
          <div>
            <PrimaryButton
              className="px-20 py-2 my-1 text-xl"
              variant="solid"
              linkProps={{ href: "/" }}
            >
              ログイン
            </PrimaryButton>
          </div>

          <div className="mt-3">
            <PrimaryButton
              className="px-12 py-2 my-1 text-xl"
              variant="solid"
              linkProps={{ href: "/home" }}
            >
              テストユーザー
            </PrimaryButton>
          </div>

          <div className="mt-3">
            <PrimaryButton
              className="px-3 py-1"
              variant="ghost"
              linkProps={{ href: "/" }}
            >
              アカウントをお持ちでない方は<br />こちらへ
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
