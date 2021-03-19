import Link from "next/link";
import Image from "next/image";
import { BOTTOM_NAVS } from "src/utils/constants/bottomnav";


export const ButtonNavigation = () => {
  return (
    <>
      <nav className="fixed bottom-0 w-full bg-blue-200 py-2">
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
                      <path
                        strokeWidth={1.2}
                        d={item.icon}
                      />
                    </svg>
                  </a>
                </Link>
              </li>
            )
          })}

          <li className="flex-1 text-center">
            <Link href="/home/mypage">
              <a>
                <Image
                  src="/img/gabriel-profile-picture.JPG"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

