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

  const onClickShow = () => {
    alert("Show Explanation of urgency number")
  }

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
            <button className="mx-1" onClick={onClickShow}>
              <AiOutlineQuestionCircle />
            </button>
            <p>:</p>
          </label>
          <div className="z-100">
            <Select
              label=""
              value="urgencynumber"
              array={URGENCYNUMBERS}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>体温</p>
              <button onClick={onClickAdd}>
                <BsPlusCircle />
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
              <Input id="time" placeholder="例：23:15" variant="underlined" />
              </div>
              <div className="flex-1 ml-2">
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
          </div>
          <div className="z-90">
          <Select label="機嫌"  value="mood" array={MOODS} />
          </div>
          <div className="z-80">
          <Select
            label="運動(活発性)"
            value="exercise"
            array={EXERCISES}
          />
          </div>
          <div className="z-70">
          <Select label="顔つき" value="face" array={FACES} />
          </div>
          <div className="z-60">
          <Select
            label="食欲"
            value="appetite"
            array={APPETITES}
          />
          </div>
          <div className="z-50">
          <Select
            label="呼吸"
            value="breath"
            array={BREATHS}
          />
          </div>
          <div className="z-40">
          <Select label="睡眠" value="sleep" array={SLEEPS} />
          </div>
          <div className="z-30">
          <Select
            label="下痢、嘔吐"
            value="diarrhea"
            array={DIARRHEAS}
          />
          </div>
          <div className="z-20">
          <Select label="咳" value="cough" array={COUGHS} />
          </div>
          <div className="z-10">
          <Select
            label="皮膚の状況"
            value="skin"
            array={SKINS}
          />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Toddler;
