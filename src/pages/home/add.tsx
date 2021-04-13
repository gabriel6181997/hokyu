//Import Libraries
import { useRouter } from "next/router";
import Modal from "react-modal";
import { InputHTMLAttributes, useEffect, useState } from "react";

//Import Components
import { auth } from "src/firebase";
import { GenderSwitch } from "src/components/separate/GenderSwitch";
import { Input } from "src/components/shared/Input";
import { Layout } from "src/components/separate/Layout";
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
import { TemperatureList } from "src/components/separate/TemperatureList";
import { useForm } from "react-hook-form";

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [toddlerImageFile, setToddlerImageFile] = useState<any>(null);
  const [temperatureList, setTemperatureList] = useState([]);
  const router = useRouter();

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
    // const newTemperatureList = [...TemperatureList, ]
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = ()=> {
    setIsOpen(false);
  }

  const onSubmit = (data) => console.log(data);

  return (
    <Layout sideMenu buttonNavigation title="新規幼児">
      <form className="container space-y-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex ms:flex-col items-center justify-center pt-12">
          <div className="relative w-36 h-36">
            <img
              src="/img/nouserimage.jpg"
              // alt="profile-picture"
              className="w-full h-auto rounded-full border-gray-700 border object-fit"
              id="avatar"
            />

            <input
              className="z-10 absolute bottom-0 w-36 h-36 opacity-0"
              type="file"
              onChange={handleChange}
            />

            <div className="absolute right-0 bottom-1 z-20">
              <GenderSwitch {...register("gender")}
 />
            </div>
          </div>
          <div className="ms:mt-7 mt-3 ms:ml-0 ml-10 md:ml-20">
            <Input
              id="name"
              placeholder="名前"
              variant="underlined"
              {...register("name", { required: "名前を入力してください！" })}
            />
            <div className="mt-8 flex">
              <Input
                id="age"
                placeholder="年齢"
                variant="underlined"
                {...register("age", { required: "年齢を入力してください！" })}
              />
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
            {...register("urgencynumbers")}
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
                体温
              </p>
              <button
                className="text-gray-600 dark:text-white"
                onClick={onClickAdd}
              >
                <BiPlusCircle />
              </button>
            </div>

            <TemperatureList />
          </div>

          <div>
            <Select label="機嫌" value="mood" array={MOODS} {...register("mood")}/>
          </div>
          <div>
            <Select label="運動(活発性)" value="exercise" array={EXERCISES} {...register("exercise")}/>
          </div>
          <div>
            <Select label="顔つき" value="face" array={FACES} {...register("face")} />
          </div>
          <div>
            <Select label="食欲" value="appetite" array={APPETITES} {...register("appetite")} />
          </div>
          <div>
            <Select label="呼吸" value="breath" array={BREATHS} {...register("breath")} />
          </div>
          <div>
            <Select label="睡眠" value="sleep" array={SLEEPS} {...register("sleep")}/>
          </div>
          <div>
            <Select label="下痢、嘔吐" value="diarrhea" array={DIARRHEAS} {...register("diarrhea")} />
          </div>
          <div>
            <Select label="咳" value="cough" array={COUGHS} {...register("cough")} />
          </div>
          <div>
            <Select label="皮膚の状況" value="skin" array={SKINS} {...register("skin")} />
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-700 dark:text-white font-medium">
              他の症状
            </p>
            <Input
              textarea
              id="others"
              placeholder="他の症状があれば、ご記入ください。"
              variant="box"
              className="text-sm pt-1"
              {...register("others")}
            />
          </div>
        </div>
        <div>
          <PrimaryButton
            button
            type="submit"
            variant="solid"
            className="px-8 py-2"
          >
            追加する
          </PrimaryButton>
        </div>
      </form>
    </Layout>
  );
};

export default Add;
