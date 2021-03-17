import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

export const GLOBAL_MENUS = [
  {
    href:"/",
    label: "ホーム",
    icon: <AiFillHome />,
  },
  {
    href:"/",
    label: "検索",
    icon:<AiOutlineSearch />,
  },
  {
    href:"/",
    label: "マイページ",
    icon: <BsFillPersonFill />,
  },
] as const;
