import type { VFC } from "react";
import {  useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

type Props = {
  label?: string;
  values: string;
  variant: "MOODS" | "EXERCISES" | "FACES" | "APPETITES" | "BREATH" | "SLEEPS" | "DIARROHOEAS" | "COUGHS" | "SKINS";
  array:string[];
};


export const Select: VFC<Props> = (props) => {
     const MOODS =  ["普段と同じ","くずっている","不機嫌","落ち着いていない"] //機嫌
     const EXERCISES = ["普段と同じ", "活気がない", "ぐったりしている"] //運動（活発性）
     const FACES = ["生き生きしている","普段と同じ",""] // 顔つき
     const APPETITES = ["普段と同じ","低下ぎみ","ほとんど食べない"] //食欲
     const BREATHS = ["普段と同じ","早い","呼吸時に小鼻を動かして肩で呼吸している"]; //呼吸
     const SLEEPS = ["普段と同じ","眠りが浅い","寝つき、目覚めは悪い"]; //睡眠
     const DIARROHOEAS = ["軽い下痢","頻繁な下痢","嘔吐を伴う激しい下痢"]; //下痢、嘔吐
     const COUGHS = ["軽い咳","動くと咳き込む","セーざーヒューヒュー音の咳","苦しそうな頻繁な咳"]; //咳
     const SKINS = ["発疹がある","乾燥している"]; //皮膚の状況


  const [SelectedArray, setSelectedArray] = useState(props.array);


  return(
    <Listbox
      as="div"
      className="space-y-1"
      value={props.values} //{MOODS}
      onChange={setSelectedArray}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
            {props.label}
            {/* 機嫌 */}
          </Listbox.Label>
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition ease-in-out duration-300 sm:text-sm sm:leading-5">
                <span className="block truncate">
                  {SelectedArray}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </span>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
            >
              <Listbox.Options
                static
                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >


                {MOODS.map( (mood) => (
                  <Listbox.Option key={mood} value={mood}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active
                            ? "text-white bg-blue-600"
                            : "text-gray-900"
                        } cursor-default select-none relative py-2 pl-8 pr-4`}
                      >
                        <span
                          className={`${
                            selected ? "font-semibold" : "font-normal"
                          } block truncate`}
                        >
                          {mood}
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? "text-white" : "text-blue-600"
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
