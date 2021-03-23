import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { GLOBAL_MENUS } from "src/utils/constants/menu";

export const SideMenu = () => {

  return (
    <aside className="flex flex-col ml-auto w-48 sticky h-screen top-0">
      <div className="ml-2 py-7 text-center flex items-center">
        <Image src="/img/logo.png" alt="logo" width={50} height={50}/>
        <h1 className="font-custom text-3xl pl-2">Hokyu</h1>
      </div>
      <nav>
        <ul>
          {GLOBAL_MENUS.map(({ icon, label, href }) => (
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
          ))}
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

      <div className="mt-auto mb-5">
        <PrimaryButton
          button
          className="px-1 py-1"
          variant="ghost"
          onClick={() => { alert("Logout")}}
        >
          <Image
            src="/img/gabriel-profile-picture.JPG"
            alt="profile-picture"
            className="rounded-full"
            width={43}
            height={43}
          />
          <div className="pl-2 text-left">
            <p className="font-bold">ガブリエル</p>
            <p>gabriel6181997</p>
          </div>
          <p className="mb-4 text-xl  ml-1 mr-2">…</p>
        </PrimaryButton>
      </div>
    </aside>
  );
};
