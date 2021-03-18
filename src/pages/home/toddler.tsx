import Image from "next/image";
import { Layout } from "src/components/separate/layout";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { Input } from "src/components/shared/Input";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Select } from "src/components/shared/Select";

const URGENCYNUMBERS = [1, 2, 3, 4, 5];

const Toddler = () => {

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
          <select name="urgency" id="urgency">
            {URGENCYNUMBERS.map((urgencynumber) => (
              <option key={urgencynumber} value={urgencynumber}>
                {urgencynumber}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div>
            <Select label="機嫌" values="MOODS" array="MOODS"/>
          </div>
          <div>
            <Select label="運動(活発性)" values="EXERCISES" array="EXERCISES"/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Toddler;
