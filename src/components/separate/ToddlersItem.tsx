import React, { forwardRef } from "react";
import { GiMale, GiFemale } from "react-icons/gi";

type Props = {
  age: string;
  name: string;
  urgency: string;
  gender: string;
  toddlerphoto: string;
};

export const ToddlerItem: React.FC<Props> = forwardRef<
  HTMLAnchorElement,
  Props
>(({ age, name, urgency, gender, toddlerphoto }, ref) => {
  return (
    <>
      <a className="flex items-center py-3 pr-3" ref={ref}>
        <div className="w-32 h-32 pl-4 relative mt-3">
          <img src={toddlerphoto} alt={name} className="rounded-full" />
          <div className="absolute ms:bottom-4 bottom-2 right-0 ms:text-2xl text-3xl p-2 bg-white rounded-full border">
            {gender === "male" ? (
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
          <h2 className="text-xl md:text-2xl">{name}</h2>
          <p className="text-lg pt-1 md:pt-3">{age}歳</p>
        </div>
        <div className="items-center mr-3 text-center">
          <p className="ms:text-xs">緊急度:</p>
          <p className="text-3xl md:text-5xl">{urgency}</p>
        </div>
        <p className=" text-center text-2xl md:text-4xl ml-auto">〉</p>
      </a>
    </>
  );
});
