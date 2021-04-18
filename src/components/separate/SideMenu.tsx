//Import Libraries
import Image from "next/image";
//Import Icons
import { BsPencilSquare } from "react-icons/bs";
import { useRecoilValue } from "recoil";
//Import Components (or utils)
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { userInfoState } from "src/store/userInfoState";
import { GLOBAL_MENUS } from "src/utils/constants/menu";

export const SideMenu = () => {

  const userInfoData = useRecoilValue(userInfoState)

  return (
      <aside className="flex flex-col ml-auto w-48 sticky h-screen top-0">
        <div className="ml-2 py-7 text-center flex items-center">
          <Image src="/img/logo.png" alt="logo" width={50} height={50} />
          <h1 className="font-custom text-3xl pl-2">Hokyu</h1>
        </div>
        <nav>
          <ul>
            {GLOBAL_MENUS.map(({ icon, label, href }) => {return (
              <li key={label}>
                <PrimaryButton
                  className="px-3 py-3 my-1 text-xl"
                  variant="ghost"
                  linkProps={{ href: href }}
                >
                  <div>{icon}</div>
                  <p className="pl-4 font-bold">{label}</p>
                </PrimaryButton>
              </li>
            )})}
          </ul>
        </nav>

        <div className="px-4 pt-6">
          <PrimaryButton
            className="px-8 py-3"
            variant="solid"
            linkProps={{ href: "/home/add" }}
          >
            <BsPencilSquare />
            <p className="pl-3">新規幼児</p>
          </PrimaryButton>
        </div>

        <div className="mt-auto mb-5 mx-auto flex items-center">
          <img
            src={userInfoData.profileImageFile}
            alt={userInfoData.name}
            className="rounded-full w-11 h-11"
          />
          <div className="pl-2 text-left">
            <p className="font-bold dark:text-white ">{userInfoData.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{userInfoData.username}
            </p>
          </div>
        </div>
      </aside>
  );
};
