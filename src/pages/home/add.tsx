//Import Libraries
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//Import React Icons
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiMinusCircle,BiPlusCircle } from "react-icons/bi";
import Modal from "react-modal";
import { GenderSwitch } from "src/components/separate/GenderSwitch";
import { Layout } from "src/components/separate/Layout";
import { TemperatureList } from "src/components/separate/TemperatureList";
import { Input } from "src/components/shared/Input";
import { PrimaryButton } from "src/components/shared/PrimaryButton";
import { Select } from "src/components/shared/Select";
//Import Components
import { auth } from "src/firebase";
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

  const handleOnClickAdd = () => {
    alert("Add Input");
    // const newTemperatureList = [...TemperatureList, ]
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data) => {return console.log(data)};

  return (
    <Layout sideMenu buttonNavigation title="????????????">
      <form
        className="container space-y-6 pb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex ms:flex-col items-center justify-center pt-12">
          <div className="relative w-36 h-36">
            <img
              src="/img/nouserimage.jpg"
              alt=""
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
            <Input
              placeholder="??????"
              variant="underlined"
              {...register("name", { required: "????????????????????????????????????" })}
            />
            <div className="mt-8 flex">
              <Input
                placeholder="??????"
                variant="underlined"
                {...register("age", { required: "????????????????????????????????????" })}
              />
              <p>???</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <label htmlFor="urgency" className="flex mr-6">
            <p>?????????</p>
            <button className="mx-1" onClick={handleOpenModal}>
              <AiOutlineQuestionCircle />
            </button>
            <p>:</p>
          </label>
          <div className="w-24">
            <Select array={URGENCYNUMBERS} {...register("urgencynumbers")} />
          </div>
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Urgency Modal"
            className="bg-blue-200 dark:bg-gray-700 w-80 relative top-1/3 left-1/4 md:left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 p-5 z-50"
          >
            <button
              className="absolute top-1 right-4 font-bold"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h1 className="font-bold text-center">?????????</h1>
            <p className="pt-7 leading-loose">
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????5???????????????????????????????????????????????????????????????????????????????????????
            </p>
          </Modal>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-700 font-medium dark:text-white">
                ??????
              </p>
              <button
                className="text-gray-600 dark:text-white"
                onClick={handleOnClickAdd}
              >
                <BiPlusCircle />
              </button>
            </div>

            <div className="flex space-between gap-2">
              <Input type="time" variant="underlined" {...register("time")} />
              <Input
                variant="underlined"
                placeholder="??????37??C"
                {...register("degree")}
              />
            </div>
          </div>

          <div>
            <Select array={MOODS} {...register("mood")} label="??????" />
          </div>

          <div>
            <Select
              array={EXERCISES}
              {...register("exercise")}
              label="?????? (?????????)"
            />
          </div>
          <div>
            <Select array={FACES} {...register("face")} label="?????????" />
          </div>
          <div>
            <Select array={APPETITES} {...register("appetite")} label="??????" />
          </div>
          <div>
            <Select array={BREATHS} {...register("breath")} label="??????" />
          </div>
          <div>
            <Select array={SLEEPS} {...register("sleep")} label="??????" />
          </div>
          <div>
            <Select
              array={DIARRHEAS}
              {...register("diarrhea")}
              label="???????????????"
            />
          </div>
          <div>
            <Select array={COUGHS} {...register("cough")} label="???" />
          </div>
          <div>
            <Select array={SKINS} {...register("skin")} label="???????????????" />
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-700 dark:text-white font-medium">
              ????????????
            </p>
            <Input
              textarea
              placeholder="???????????????????????????????????????????????????"
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
            ????????????
          </PrimaryButton>
        </div>
      </form>
    </Layout>
  );
};

export default Add;
