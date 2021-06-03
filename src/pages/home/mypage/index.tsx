//Import Libraries
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { Layout } from "src/components/separate/Layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { testUser } from "src/config/testuser";
//Import Components
import { auth } from "src/firebase";
import { userInfoState } from "src/store/userInfoState";

const MyPage = () => {
  const user = auth.currentUser;
  const router = useRouter();
  const userInfoData = useRecoilValue(userInfoState);

  const handleLogout = () => {
    const answer = confirm("ログアウトしますか？");
    if (answer) {
      auth.signOut();
      router.push("/");
    }
  };

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      <div className="text-center mx-auto pt-10">
        <img
          src={userInfoData.profileImageFile}
          alt={userInfoData.name}
          className="block mx-auto rounded-full w-52 h-52 object-fit"
        />

          <p className="text-2xl font-bold py-6">{userInfoData.name}</p>
          <p className="mt-2">{userInfoData.username}</p>

        <div className="flex flex-col">
          {user !== null && user.email === testUser.email ? null : (
            <div className="mt-6">
              <PrimaryButton
                className="px-20 py-2 my-1 text-xl"
                variant="solid"
                linkProps={{ href: "/home/mypage/edit" }}
                >
                編集
              </PrimaryButton>
            </div>
          )}

          <div className="my-4">
            <PrimaryButton
              button
              className="px-12 py-2 my-1 text-xl"
              variant="solid"
              onClick={handleLogout}
            >
              ログアウト
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
