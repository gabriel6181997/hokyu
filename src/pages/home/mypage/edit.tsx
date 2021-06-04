import { useRecoilValue } from "recoil";
import { Layout } from "src/components/separate/Layout";
import { UserInfoEdit } from "src/components/separate/UserInfoEdit";
import { userInfoState } from "src/store/userInfoState";

const UserInfoEditPage = () => {
  const userInfoData = useRecoilValue(userInfoState);

  return (
    <Layout addbutton sideMenu buttonNavigation title="マイページ">
      {userInfoData ? (
        <UserInfoEdit preloadedValues={userInfoData} />
      ) : (
        <div className="text-center mx-auto pt-10">
          <div className="mx-auto w-52 h-52 rounded-full bg-gray-200"></div>
          <div className="w-72 mx-auto my-7 h-8 bg-gray-200"></div>
          <div className="w-72 mx-auto mt-2 h-8 bg-gray-200"></div>
          <div className="mt-6 px-20 h-11 bg-gray-200 w-52 mx-auto rounded-full"></div>
        </div>
      )}
    </Layout>
  );
};

export default UserInfoEditPage;
