import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GiFemale, GiMale } from "react-icons/gi";
import { Layout } from "src/components/separate/Layout";
import { db } from "src/firebase";


const ToddlerPage = () => {
  const router = useRouter();
  const { toddlerId } = router.query;
  const [toddlerInfo, setToddlerInfo] = useState({});

  useEffect(()=> {
    db.collection("toddlers").doc(toddlerId as string).get()
    .then((doc)=> {
      if(doc.exists){
        setToddlerInfo(doc.data())
      }
    })
    .catch((error)=> {
      // eslint-disable-next-line no-console
      console.log(error.message)
    })

  },[])

  return (
    <Layout sideMenu buttonNavigation title="幼児詳細">
      <div className="container space-y-6 pb-6">
        <div className="pt-12 flex ms:flex-col items-center justify-center">
          <div className="relative w-36 h-36">
            <img
              src={toddlerInfo.toddlerphoto ??"/img/nouserimage.jpg"}
              alt=""
              className="w-full h-auto rounded-full border-gray-700 border object-fit"
            />
            <div className="absolute right-0 bottom-1 z-20 text-2xl p-2 bg-white rounded-full border">
              {toddlerInfo.gender === "male" ? (
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

          <div className="ms:mt-7 mt-3 ms:ml-0 ml-10 md:ml-20">
            <p>{toddlerInfo.name}</p>
            <p className="mt-8">{toddlerInfo.age}歳</p>
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
            <p>: {toddlerInfo.urgency}</p>
          </label>
        </div>

        <div className="space-y-4 text-sm text-gray-700 dark:text-white font-medium">
          <div className="space-y-2">
            <p>体温</p>
            {Object.keys(toddlerInfo.temperature).map((value) => {
              return (
                <div
                  key={toddlerInfo.temperature[value]}
                  className="flex gap-20 sm:gap-40 my-1"
                >
                  <p>{toddlerInfo.temperature[value].time}</p>
                  <p>{toddlerInfo.temperature[value].degree}°C</p>
                </div>
              );
            })}
          </div>

          <div>
            <label htmlFor="moods">機嫌</label>
            <p>{toddlerInfo.mood}</p>
          </div>

          <div>
            <label htmlFor="exercises">運動(活発性)</label>
            <p>{toddlerInfo.exercise}</p>
          </div>
          <div>
            <label htmlFor="faces">顔つき</label>
            <p>{toddlerInfo.face}</p>
          </div>
          <div>
            <label htmlFor="appetites">食欲</label>
            <p>{toddlerInfo.appetite}</p>
          </div>
          <div>
            <label htmlFor="breaths">呼吸</label>
            <p>{toddlerInfo.breath}</p>
          </div>
          <div>
            <label htmlFor="sleeps">睡眠</label>
            <p>{toddlerInfo.sleep}</p>
          </div>
          <div>
            <label htmlFor="cough">咳</label>
            <p>{toddlerInfo.cough}</p>
          </div>
          <div>
            <label htmlFor="skins">皮膚の状況</label>
            <p>{toddlerInfo.skin}</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="others">他の症状</label>
            <p>{toddlerInfo.others}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToddlerPage;
