//Import Libraries
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "react-modal";
import {InputHTMLAttributes, useEffect, useState } from "react";
import { format } from 'date-fns'

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
  const [toddlerImageFile, setToddlerImageFile] = useState<any>(null);
  const [time,setTime] = useState<number>(2020202020);
  const router = useRouter();


  const inputTime: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
    setTime(Number(e.target.value))
  };

  const formatTime = (numberValue: number) => {
    const stringValue = numberValue.toString();
    if(stringValue.length < 12) {
      return
    };
    const year = stringValue.slice(0,4);
    const month = stringValue.slice(4,6);
    const date = stringValue.slice(6,8);
    const hour = stringValue.slice(8,10);
    const minute = stringValue.slice(10,12);
    const value = `${year}-${month}-${date} ${hour}:${minute}`
    const formatedTime = format(new Date(value), "yyyy年M月d日 HH:mm");
    return formatedTime;
  }


  // useEffect(() => {
  //   if (!auth.currentUser) {
  //     router.push("/");
  //   }
  // }, [auth.currentUser]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (_e: any) => {
      const img = document.getElementById("avatar") as HTMLImageElement;
      img.src = _e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setToddlerImageFile(file);
  };

  const onClickAdd = () => {
    alert("Add Input");
  };

  const onClickDelete = () => {
    alert("Delete Temperature");
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const SubmitData = () => {
    alert("Submit Data");
  };

  return (
    <Layout sideMenu buttonNavigation title="新規幼児">
      <div className="container space-y-6 pb-6">
        <div className="flex ms:flex-col items-center justify-center pt-12">
          <div className="relative w-36 h-36">
            <img
              src="/img/nouserimage.jpg"
              alt="profile-picture"
              className="w-full h-auto rounded-full border-gray-700 border object-fit"
              id="avatar"
            />

            <input
              className="z-10 absolute bottom-0 w-36 h-36 opacity-0"
              type="file"
              onChange={handleChange}
            />

            <div className="absolute right-0 bottom-1 z-20">
              <GenderSwitch />
            </div>
          </div>
          <div className="ms:mt-7 mt-3 ms:ml-0 ml-10 md:ml-20">
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
          <Select
            label=""
            className="z-100"
            value="urgencynumber"
            array={URGENCYNUMBERS}
          />
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Urgency Modal"
            className="bg-blue-200 dark:bg-gray-700 w-80 relative top-1/3 left-1/4 md:left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 p-5 z-50"
          >
            <button
              className="absolute top-1 right-4 font-bold"
              onClick={closeModal}
            >
              X
            </button>
            <h1 className="font-bold text-center">緊急度</h1>
            <p className="pt-7 leading-loose">
              緊急度とは、園医が幼児の身体状況によって決める数字です。数字が高ければ高いほど、状況が厳しいです。5は最も厳しい状況を表すもので、救急車を呼ぶ必要があります。
            </p>
          </Modal>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 font-medium dark:text-white">
                体温  {formatTime(time)}
              </p>
              <button
                className="text-gray-600 dark:text-white"
                onClick={onClickAdd}
              >
                <BiPlusCircle />
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <Input
                 type="text"
                 id="time"
                 placeholder="例：11:15"
                 onChange={inputTime}
                 variant="underlined"
                 value={time}
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
              <button
                className="text-gray-600 dark:text-white ml-1"
                onClick={onClickDelete}
              >
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
          <div>
            <Select label="顔つき" value="face" array={FACES} />
          </div>
          <div>
            <Select label="食欲" value="appetite" array={APPETITES} />
          </div>
          <div>
            <Select label="呼吸" value="breath" array={BREATHS} />
          </div>
          <div>
            <Select label="睡眠" value="sleep" array={SLEEPS} />
          </div>
          <div>
            <Select label="下痢、嘔吐" value="diarrhea" array={DIARRHEAS} />
          </div>
          <div>
            <Select label="咳" value="cough" array={COUGHS} />
          </div>
          <div>
            <Select label="皮膚の状況" value="skin" array={SKINS} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-700 dark:text-white font-medium">
              他の症状
            </p>
            <Input
              textarea
              id="detail"
              placeholder="他の症状があれば、ご記入ください。"
              variant="box"
              className="text-sm pt-1"
            />
          </div>
        </div>
        <div>
          <PrimaryButton
            button
            variant="solid"
            className="px-8 py-2"
            onClick={SubmitData}
          >
            追加する
          </PrimaryButton>
        </div>
      </div>
    </Layout>
  );
};

export default Add;
