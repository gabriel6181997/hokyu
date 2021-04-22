import { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DatetimePicker } from "src/components/separate/DatetimePicker";
import { Layout } from "src/components/separate/Layout";
import { Input } from "src/components/shared/Input";
import { TestInputItem } from "src/components/test/TestInputItem";
import { inputListState } from "src/store/inputListState";

const Add2 = () => {
  const [inputList, setInputList] = useState([])

  const handleOnClickAdd = () => {
    setInputList((oldInputList) => [
      ...oldInputList,
      {
        id: getId(),
      },
    ]);
  };

  return (
    <Layout sideMenu buttonNavigation title="add2">
      <div className="mt-5 mx-3">
        <div className="flex justify-between ">
          <p className="text-sm text-gray-700 font-medium dark:text-white">
            体温
          </p>
          <button
            className="text-gray-600 dark:text-white"
            onClick={handleOnClickAdd}
          >
            <BiPlusCircle />
          </button>
        </div>

        {inputList.map(()=> (
            <TestInputItem />
        ))}
      </div>
    </Layout>
  );
};

export default Add2;

let id = 0;
const getId = () => {
  return id++;
};
