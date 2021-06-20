import type { GetStaticPaths, GetStaticProps } from "next";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GiFemale, GiMale } from "react-icons/gi";
import { Layout } from "src/components/separate/Layout";
import { db } from "src/firebase";

const ToddlerPage = (props) => {
  // eslint-disable-next-line react/destructuring-assignment

  return (
    <Layout sideMenu buttonNavigation title="幼児詳細">
      <div className="container space-y-6 pb-6">
        <div className="pt-12 flex ms:flex-col items-center justify-center">
          <div className="relative w-36 h-36">
            <img
              src={props.toddlerphoto ?? "/img/nouserimage.jpg"}
              alt=""
              className="w-full h-auto rounded-full border-gray-700 border object-fit"
            />
            <div className="absolute right-0 bottom-1 z-20 text-2xl p-2 bg-white rounded-full border">
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

          <div className="ms:mt-7 mt-3 ms:ml-0 ml-10 md:ml-20">
            <p>{props.name} </p>
            <p className="mt-8">{props.age}歳</p>
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
            <p>: {props.urgency}</p>
          </label>
        </div>

        <div className="space-y-4 text-sm text-gray-700 dark:text-white font-medium">
          <div className="space-y-2">
            <p>体温</p>
            {Object.keys(props.temperature).map((value) => {
              return (
                <div
                  key={props.temperature[value]}
                  className="flex gap-20 sm:gap-40 my-1"
                >
                  <p>{props.temperature[value].time}</p>
                  <p>{props.temperature[value].degree}°C</p>
                </div>
              );
            })}
          </div>

          <div>
            <label htmlFor="moods">機嫌</label>
            <p>{props.mood}</p>
          </div>

          <div>
            <label htmlFor="exercises">運動(活発性)</label>
            <p>{props.exercise}</p>
          </div>
          <div>
            <label htmlFor="faces">顔つき</label>
            <p>{props.face}</p>
          </div>
          <div>
            <label htmlFor="appetites">食欲</label>
            <p>{props.appetite}</p>
          </div>
          <div>
            <label htmlFor="breaths">呼吸</label>
            <p>{props.breath}</p>
          </div>
          <div>
            <label htmlFor="sleeps">睡眠</label>
            <p>{props.sleep}</p>
          </div>
          <div>
            <label htmlFor="cough">咳</label>
            <p>{props.cough}</p>
          </div>
          <div>
            <label htmlFor="skins">皮膚の状況</label>
            <p>{props.skin}</p>
          </div>

          <div className="space-y-1">
            <label htmlFor="others">他の症状</label>
            <p>{props.others}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const toddlersData = await db.collection("toddlers").get();
  // eslint-disable-next-line arrow-body-style
  const paths = toddlersData.docs.map((toddlerData) => ({
    params: {
      toddlerId: toddlerData.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const toddlerId  = context.params?.toddlerId as string;
  const content = {};
  await db
    .collection("toddlers")
    .doc(toddlerId)
    .get()
    .then((result) => {
      content["name"] = result.data().name;
      content["age"] = result.data().age;
      content["toddlerphoto"] = result.data().toddlerphoto;
      content["gender"] = result.data().gender;
      content["urgency"] = result.data().urgency;
      content["temperature"] = result.data().temperature;
      content["mood"] = result.data().mood;
      content["exercise"] = result.data().exercise;
      content["face"] = result.data().face;
      content["appetite"] = result.data().appetite;
      content["breath"] = result.data().breath;
      content["sleep"] = result.data().sleep;
      content["cough"] = result.data().cough;
      content["skin"] = result.data().skin;
      content["others"] = result.data().others;
    });

  return {
    props: {
      name: content.name,
      age: content.age,
      toddlerphoto: content.toddlerphoto,
      gender: content.gender,
      urgency: content.urgency,
      temperature: content.temperature,
      mood: content.mood,
      exercise: content.exercise,
      face: content.face,
      appetite: content.appetite,
      breath: content.breath,
      sleep: content.sleep,
      cough: content.cough,
      skin: content.skin,
      others: content.others,
    },
  };
};

export default ToddlerPage;
