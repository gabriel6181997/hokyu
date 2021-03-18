import Image from "next/image";
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

const IndexPage = () => {
  return (
    <>
      <DarkModeSwitch />
      <Image src="/img/temporary_logo.jpg" width={200} height={200} />
      <p>ログイン</p>
      <div>
        <Input
          id="email"
          placeholder="ユーザー名/メールアドレス"
          variant="underlined"
        />

        <Input
          id="password"
          placeholder="パスワード"
          variant="underlined"
        />
      </div>

      <div>
        <PrimaryButton
          className=""
          variant="solid"
          linkProps={{ href: "/home/index" }}
          >
          ログイン
        </PrimaryButton>

        <PrimaryButton
          className=""
          variant="solid"
          linkProps={{ href: "/home/index" }}
          >
          テストユーザー
        </PrimaryButton>


      </div>
    </>
  );
};

export default IndexPage;
