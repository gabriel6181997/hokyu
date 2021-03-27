//Import Libraries
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "react-modal";
import {useEffect, useState} from "react";

//Import Components
import { auth } from "src/firebase";
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


const Add = () => {
  const router = useRouter();

  useEffect(()=> {
    if (!auth.currentUser){
      router.push('/')
    };
  },[auth.currentUser])

  const onClickAdd = () => {
    alert("Add Input");
  };

  const onClickDelete = () => {
    alert("Delete Temperature");
  };

  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
  setIsOpen(false);
  }

  return (
    <Layout sideMenu buttonNavigation title="新規幼児">
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
          <div>
            {/* <PrimaryButton
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
            </PrimaryButton> */}
             <PrimaryButton
              button
              variant="outline"
              className="text-base"
              onClick={() => {
                alert("Add Toddler");
              }}
            >
              追加する
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
            <button className="mx-1" onClick={openModal}>
              <AiOutlineQuestionCircle />
            </button>
            <p>:</p>
          </label>
            <Select label="" className="z-100" value="urgencynumber" array={URGENCYNUMBERS} />
        </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Urgency Modal"
          className="bg-blue-200 dark:bg-gray-700 w-80 relative top-1/3 left-1/4 md:left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 p-5"
        >

          <button className="absolute top-1 right-4 font-bold" onClick={closeModal}>X</button>
          <h1 className="font-bold text-center">緊急度</h1>
          <p className="pt-7 leading-loose">緊急度とは、園医が幼児の身体状況によって決める数字です。数字が高ければ高いほど、状況が厳しいです。5は最も厳しい状況を表すもので、救急車を呼ぶ必要があります。</p>
        </Modal>
      </div>


        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 font-medium dark:text-white">体温</p>
              <button className="text-gray-600 dark:text-white" onClick={onClickAdd}>
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
              <button className="text-gray-600 dark:text-white ml-1" onClick={onClickDelete}>
                <BiMinusCircle />
              </button>
            </div>
          </div>
          <div>
            <Select label="機嫌" value="mood" array={MOODS} />
          </div>
          <div>
            <Select label="運動(活発性)" value="exercise" array={EXERCISES} />
          </div>
          <div >
            <Select label="顔つき" value="face" array={FACES} />
          </div>
          <div >
            <Select label="食欲" value="appetite" array={APPETITES} />
          </div>
          <div >
            <Select label="呼吸" value="breath" array={BREATHS} />
          </div>
          <div >
            <Select label="睡眠" value="sleep" array={SLEEPS} />
          </div>
          <div >
            <Select label="下痢、嘔吐" value="diarrhea" array={DIARRHEAS} />
          </div>
          <div >
            <Select label="咳" value="cough" array={COUGHS} />
          </div>
          <div >
            <Select label="皮膚の状況" value="skin" array={SKINS} />
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

export default Add;
