import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

export const GLOBAL_MENUS = [
  {
    href:"/home",
    label: "ホーム",
    icon: <AiFillHome />,
  },
  {
    href:"/home/search",
    label: "検索",
    icon:<AiOutlineSearch />,
  },
  {
    href:"/home/mypage",
    label: "マイページ",
    icon: <BsFillPersonFill />,
  },
] as const;
