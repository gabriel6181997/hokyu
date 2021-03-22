//Import Libraries
import Image from "next/image";
import { useState } from "react";

//Import Components
import { GenderSwitch } from "src/components/separate/GenderSwitch";
import { Input } from "src/components/shared/Input";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { Select } from "src/components/shared/Select";

//Import React Icons
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";

import {
  APPETITES,
  BREATHS,
  COUGHS,
  DIARRHEAS,
  EXERCISES,
  FACES,
  MOODS,
  SKINS,
  SLEEPS,
  URGENCYNUMBERS,
} from "src/utils/constants/selectoption";

const Toddler = () => {
  const onClickAdd = () => {
    alert("Add Input");
  };

  const onClickDelete = () => {
    alert("Delete Temperature");
  };

  const onClickShow = () => {
    alert("Show Explanation of urgency number");
  };


  return (
    <Layout sideMenu buttonNavigation>
      <div className="container space-y-6 pb-6">
        <div className="flex justify-between pt-3 text-lg">
          <PrimaryButton
            button
            variant="outline"
            className="text-base"
            onClick={() => {
              alert("Back");
            }}
          >
            ←戻る
          </PrimaryButton>
          <div className="mr-4">
            <PrimaryButton
              button
              className="mr-5 text-base"
              variant="outline"
              onClick={() => {
                alert("Update");
              }}
            >
              更新する
            </PrimaryButton>
            <PrimaryButton
              button
              variant="outline"
              className="text-base"
              onClick={() => {
                alert("Delete");
              }}
            >
              削除する
            </PrimaryButton>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative">
            <Image
              src="/img/notoddlerimage.png"
              alt="profile-picture"
              width={150}
              height={150}
            />
            <div className="absolute right-0 bottom-3">
              <GenderSwitch />
            </div>
          </div>
          <div className="mt-3 ml-20">
            <Input id="name" placeholder="名前" variant="underlined" />
            <div className="mt-8 flex">
              <Input id="age" placeholder="年齢" variant="underlined" />
              <p>歳</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <label className="flex mr-6">
            <p>緊急度</p>
            <button className="mx-1" onClick={onClickShow}>
              <AiOutlineQuestionCircle />
            </button>
            <p>:</p>
          </label>
            <Select label="" className="z-100" value="urgencynumber" array={URGENCYNUMBERS} />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 font-medium dark:text-white">体温</p>
              <button className="text-gray-600" onClick={onClickAdd}>
                <BiPlusCircle />
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <Input
                  id="time"
                  placeholder="例：23:15"
                  variant="underlined"
                  className="text-sm"
                />
              </div>
              <div className="flex-1 ml-2">
                <Input
                  id="temperature"
                  placeholder="例：37°C"
                  variant="underlined"
                  className="text-sm"
                />
              </div>
              <button className="text-gray-600" onClick={onClickDelete}>
                <BiMinusCircle />
              </button>
            </div>
          </div>
          <div>
            <Select className="z-90" label="機嫌" value="mood" array={MOODS} />
          </div>
          <div>
            <Select className="z-80" label="運動(活発性)" value="exercise" array={EXERCISES} />
          </div>
          <div >
            <Select className="z-70"  label="顔つき" value="face" array={FACES} />
          </div>
          <div >
            <Select className="z-60"  label="食欲" value="appetite" array={APPETITES} />
          </div>
          <div >
            <Select className="z-50"  label="呼吸" value="breath" array={BREATHS} />
          </div>
          <div >
            <Select className="z-40" label="睡眠" value="sleep" array={SLEEPS} />
          </div>
          <div >
            <Select  className="z-30" label="下痢、嘔吐" value="diarrhea" array={DIARRHEAS} />
          </div>
          <div >
            <Select className="z-20"  label="咳" value="cough" array={COUGHS} />
          </div>
          <div >
            <Select className="z-10" label="皮膚の状況" value="skin" array={SKINS} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-700 dark:text-white font-medium">他の症状</p>
            <Input
              textarea
              id="detail"
              placeholder="他の症状があれば、ご記入ください。"
              variant="box"
              className="text-sm pt-1"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Toddler;
