import { Layout } from "src/components/separate/Layout";
import { BiPlusCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { db } from "src/firebase";
import { useEffect, useState } from "react";
import { Input } from "src/components/shared/Input";

const Add3 = () => {
  const { handleSubmit, register, setValue, getValues } = useForm();
  // const [inputList, setInputList] = useRecoilState(inputListState);

  const onSubmit = (data) => console.log(data);

  // const handleOnClickAdd = () => {
  //   setInputList((prevInputList )=> [
  //     const newInputList = [...prevInputList, data.temperature];
  //     return newInputList;
  //   ])
  // }

  return (
    <Layout sideMenu buttonNavigation title="add3">
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between ">
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

        {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}

        <div className="flex space-between gap-2">
            <Input type="time" variant="underlined" {...register("time")} />
            <Input
              variant="underlined"
              placeholder="時間を入力してください"
              {...register("temperature")}
            />
        </div>

        <button
          className="py-2  px-2 my-4 text-white rounded-3x1 shadow-md bg-blue-400 font-bold hover:bg-blue-300 duration-300 inline-flex items-center justify-center rounded-full"
          type="submit"
        >
          体温を追加
        </button>
      </form>
    </Layout>
  );
};

export default Add3;
