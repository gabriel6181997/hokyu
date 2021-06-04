//Import Libraries
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userInfoState  } from "src/store/userInfoState";
//Import Components
import { BOTTOM_NAVS } from "src/utils/constants/bottomnav";

export const ButtonNavigation = () => {

  const userInfoData = useRecoilValue(userInfoState)

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-blue-200 py-2 text-gray-700 dark:text-gray-700">
        <ul className="flex">
          {BOTTOM_NAVS.map((item) => {
            return (
              <li className="flex-1 text-center" key={item.key}>
                <Link href={item.href}>
                  <a className="w-full py-2">
                    <svg
                      className="h-7 w-7 inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path strokeWidth={1.2} d={item.icon} />
                    </svg>
                  </a>
                </Link>
                <p className="pt-1 text-sm">{item.label}</p>
              </li>
            );
          })}
          <li className="flex-1 text-center">
            <Link href="/home/mypage">
              <a>
                {userInfoData ? (
                  <img
                    src={userInfoData.profileImageFile ?? "/img/nouserimage.jpg"}
                    alt={userInfoData.name}
                    className="rounded-full block mx-auto w-7 h-7 "
                  />
                ): (
                  <div className="animate-pulse bg-gray-200 mx-auto w-7 h-7 rounded-full"></div>
                )}
              </a>
            </Link>
            <p className="text-sm pt-1">マイページ</p>
          </li>
        </ul>
      </nav>
    </>
  );
};
