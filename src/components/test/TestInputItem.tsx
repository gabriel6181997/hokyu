import { BiMinusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { inputListState } from "src/store/inputListState";
import { Input } from "../shared/Input";

export const TestInputItem = ({ item }) => {
  const [inputList, setInputList] = useRecoilState(inputListState);
  const index = inputList.findIndex((listItem) => listItem === item);

  const deleteItem = () => {
    const newList = removeItemAtIndex(inputList, index);
    setInputList(newList);
  };

  return (
    <div className="w-full flex ">
      <input
        type="text"
        className=" pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-b-2 focus:border-blue-400"
      />
      <button
        className="text-gray-600 dark:text-white ml-1"
        onClick={deleteItem}
      >
        <BiMinusCircle />
      </button>
    </div>
  );
};

export const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
