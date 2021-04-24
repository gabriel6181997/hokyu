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
    <div className="w-full flex mt-3">
      <Input
       variant="underlined"
       id="temperature"
       placeholder="例：37°C"
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
