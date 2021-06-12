import type firebase from "firebase/app";
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { GenderSwitch } from "src/components/separate/GenderSwitch";
import { Layout } from "src/components/separate/Layout";
import { auth, db } from "src/firebase";

const ToddlerPage = () => {
  const [toddlerInfo, setToddlerInfo] = useState([]);

  // useEffect(() => {
  //   const unSub = db.collection("toddlers")
  // },[])





  return (
    <Layout sideMenu buttonNavigation title="幼児詳細">
      <div className="container space-y-6 pb-6">
        <div className="pt-12 flex ms:flex-col items-center justify-center">
          <div className="relative w-36 h-36">
            <img
              src="/img/nouserimage.jpg"
              alt=""
              className="w-full h-auto rounded-full border-gray-700 border object-fit"
            />

            <div className="absolute right-0 bottom-1 z-20">
              <GenderSwitch />
            </div>
          </div>

          <div className="ms:mt-7 mt-3 ms:ml-0 ml-10 md:ml-20">
            <p>名前</p>
            <p className="mt-8">xx歳</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <label htmlFor="urgency" className="flex mr-6">
            <p>緊急度</p>
            <button
              className="mx-1"
              // onClick={handleOpenModal}
            >
              <AiOutlineQuestionCircle />
            </button>
            <p>: xx</p>
          </label>
        </div>

        <div className="space-y-4 text-sm text-gray-700 dark:text-white font-medium">
          <div className="space-y-2">
              <p>体温</p>
              <div className="flex space-between">
                <p>xxx</p>
                <p>xxx</p>
              </div>
          </div>

          <div>
            <label htmlFor="moods">機嫌</label>
            <p>xxxx</p>
          </div>

          <div>
            <label htmlFor="exercises">運動(活発性)</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="faces">顔つき</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="appetites">食欲</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="breaths">呼吸</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="sleeps">睡眠</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="cough">咳</label>
            <p>xxxx</p>
          </div>
          <div>
            <label htmlFor="skins">皮膚の状況</label>
            <p>xxxx</p>
          </div>

          <div className="space-y-1">
            <p>
              他の症状
            </p>
            <p>xxxxxx</p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ToddlerPage;
