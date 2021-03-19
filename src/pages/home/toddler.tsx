import Image from "next/image";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { Input } from "src/components/shared/Input";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { Select } from "src/components/shared/Select";
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

  return (
    <Layout sideMenu buttonNavigation>
      <div className="container space-y-6">
        <div className="flex justify-between mt-3 text-lg">
          <PrimaryButton
            button
            variant="outline"
            onClick={() => {
              alert("Back");
            }}
          >
            ←戻る
          </PrimaryButton>
          <div className="mr-4">
            <PrimaryButton
              button
              className="mr-5"
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
              onClick={() => {
                alert("Delete");
              }}
            >
              削除する
            </PrimaryButton>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/img/profile-picture-female.jpg"
            alt="profile-picture"
            width={150}
            height={150}
          />
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
            <button className="mx-1">
              <AiOutlineQuestionCircle />
            </button>
            <p>:</p>
          </label>
          <div className="z-50">
            <Select
              label=""
              values="URGENCYNUMBERS"
              value="urgencynumber"
              array={URGENCYNUMBERS}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <p>体温</p>
              <button onClick={onClickAdd}>
                <BsPlusCircle />
              </button>
            </div>
            <div className="flex items-center">
              <Input id="time" placeholder="例：23:15" variant="underlined" />
              <div className="ml-2">
                <Input
                  id="temperature"
                  placeholder="例：37°C"
                  variant="underlined"
                />
              </div>
              <button onClick={onClickDelete}>
                <BiMinusCircle />
              </button>
            </div>

            <div></div>
          </div>
          <Select label="機嫌" values="MOODS" value="mood" array={MOODS} />
          <Select
            label="運動(活発性)"
            values="EXERCISES"
            value="exercise"
            array={EXERCISES}
          />
          <Select label="顔つき" values="FACES" value="face" array={FACES} />
          <Select
            label="食欲"
            values="APPETITES"
            value="appetite"
            array={APPETITES}
          />
          <Select
            label="呼吸"
            values="BREATHS"
            value="breath"
            array={BREATHS}
          />
          <Select label="睡眠" values="SLEEPS" value="sleep" array={SLEEPS} />
          <Select
            label="下痢、嘔吐"
            values="DIARRHEAS"
            value="diarrhea"
            array={DIARRHEAS}
          />
          <Select label="咳" values="COUGHS" value="cough" array={COUGHS} />
          <Select
            label="皮膚の状況"
            values="SKINS"
            value="skin"
            array={SKINS}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Toddler;
