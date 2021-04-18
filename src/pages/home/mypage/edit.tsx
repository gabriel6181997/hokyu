import { useRecoilValue } from "recoil";
import { Layout } from "src/components/separate/Layout";
import { UserInfoEdit } from "src/components/separate/UserInfoEdit";
import { userInfoState } from "src/store/userInfoState";

const UserInfoEditPage = () => {
  const userInfoData = useRecoilValue(userInfoState)

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      {userInfoData ? (
        <UserInfoEdit preloadedValues={userInfoData} />
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export default UserInfoEditPage;
