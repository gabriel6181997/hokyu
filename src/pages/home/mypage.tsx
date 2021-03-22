import { Layout } from "src/components/separate/layout";
import Image from "next/image";
import { PrimaryButton } from "src/components/shared/PrimaryButton";

const myPage = () => {
  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      <div className="text-center pt-10">
        <Image
          src="/img/gabriel-profile-picture.JPG"
          alt="profile-picture"
          className="rounded-full"
          width={200}
          height={200}
        />
        <p className="text-2xl font-bold my-6">ガブリエル</p>
        <p className=" mt-2 ">gabriel6181997</p>

        <div className="flex flex-col">
          <div className="mt-6">
          <PrimaryButton
            className="px-20 py-2 my-1 text-xl"
            variant="solid"
            linkProps={{ href: "/" }}
          >
            編集
          </PrimaryButton>
          </div>
          <div className="my-4">
          <PrimaryButton
            className="px-10 py-2 my-1 text-xl"
            variant="solid"
            linkProps={{ href: "/" }}
          >
            サインアウト
          </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default myPage;
