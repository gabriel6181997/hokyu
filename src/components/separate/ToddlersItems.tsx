import Link from "next/link";
import { MAINITEMS } from "src/utils/constants/mainitems";

export const ToddlerItems = () => {
  return(
    <ul>
    {MAINITEMS.map(({ src, name, age, urgency }) => (
      <li key={name} className="border-b dark:border-gray-400 md:hover:bg-blue-50 duration-300 md:dark:hover:text-blue-400 md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-20">
        <Link href="/">
          <a className="flex items-center py-3">
            <img src={src} alt={name} className="w-1/6 pl-4 rounded-full" />
            <div className="w-3/6 pl-3">
              <h2 className="text-xl md:text-2xl">{name}</h2>
              <p className="text-lg pt-1 md:pt-3">{age}歳</p>
            </div>
            <div className="items-center w-1/6 text-center">
              <p>緊急度:</p>
              <p className="text-3xl md:text-5xl">{urgency}</p>
            </div>
            <p className="w-1/6 text-center text-2xl md:text-4xl">〉</p>
          </a>
        </Link>
      </li>
    ))}
  </ul>

  )
}
