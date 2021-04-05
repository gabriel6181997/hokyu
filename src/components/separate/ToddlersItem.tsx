import Link from "next/link";
import { VFC } from "react";
import { GiMale, GiFemale } from "react-icons/gi";

type Props = {
  age:string;
  key: string;
  src: string;
  name:string;
  urgency: string;
  gender: string;
  toddlerphoto: string;
}

export const ToddlerItem: VFC<Props> = (props) => {
  return (
    <>
      <li
        key={props.key}
        className="border-b dark:border-gray-400 md:hover:bg-blue-50 duration-300 md:dark:hover:text-blue-400 md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-20"
      >
        <Link href="/">
          <a className="flex items-center py-3 pr-3">
            <div className="w-32 h-32 pl-4 relative mt-3">
              <img
                src={props.toddlerphoto}
                alt={props.name}
                className="rounded-full"
              />
              <div className="absolute ms:bottom-4 bottom-2 right-0 ms:text-2xl text-3xl p-2 bg-white rounded-full border">
                {props.gender === "male" ? (
                  <div className="text-blue-400">
                    <GiMale />
                  </div>
                ) : (
                  <div className="text-rose-300">
                    <GiFemale />
                  </div>
                )}
              </div>
            </div>
            <div className="ms:w-2/6 w-3/6 ml-6">
              <h2 className="text-xl md:text-2xl">{props.name}</h2>
              <p className="text-lg pt-1 md:pt-3">{props.age}歳</p>
            </div>
            <div className="items-center mr-3 text-center">
              <p className="ms:text-xs">緊急度:</p>
              <p className="text-3xl md:text-5xl">{props.urgency}</p>
            </div>
            <p className=" text-center text-2xl md:text-4xl ml-auto">〉</p>
          </a>
        </Link>
      </li>
    </>
  );
};
