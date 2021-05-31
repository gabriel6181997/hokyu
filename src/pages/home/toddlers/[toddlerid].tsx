import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import { GenderSwitch } from "src/components/separate/GenderSwitch";
import { Layout } from "src/components/separate/Layout";
import { TemperatureList } from "src/components/separate/TemperatureList";
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
} from "src/utils/constants/selectoption";

const ToddlerPage = () => {
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

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 font-medium dark:text-white">
                体温
              </p>
              <button
                className="text-gray-600 dark:text-white"
                // onClick={handleOnClickAdd}
              >
                <BiPlusCircle />
              </button>
            </div>

            <TemperatureList />
          </div>

          <div>
            <Select array={MOODS} />
          </div>

          <div>
            <Select array={EXERCISES} />
          </div>
          <div>
            <Select array={FACES} />
          </div>
          <div>
            <Select array={APPETITES} />
          </div>
          <div>
            <Select array={BREATHS} />
          </div>
          <div>
            <Select array={SLEEPS} />
          </div>
          <div>
            <Select array={DIARRHEAS} />
          </div>
          <div>
            <Select array={COUGHS} />
          </div>
          <div>
            <Select array={SKINS} />
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-700 dark:text-white font-medium">
              他の症状
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToddlerPage;
