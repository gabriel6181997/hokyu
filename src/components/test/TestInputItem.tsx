/* eslint-disable react/destructuring-assignment */
import { BiMinusCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { inputListState } from "src/store/inputListState";
import { Input } from "src/components/shared/Input";

export const TestInputItem = ({ item }) => {
  const [inputList, setInputList] = useRecoilState(inputListState);
  const index = inputList.findIndex((listItem) => listItem === item);

  const handleDeleteItem = (inputIndex) => {
    // const newList = removeItemAtIndex(inputList, index);
    // setInputList(newList);
    const newList = inputList.filter((_, index)=> index !== inputIndex);
    setInputList(newList);
  };

  return (
    <div className="w-full flex mt-3">
      <Input
       variant="underlined"
       name="temperature"
       placeholder="例：37°C"
      />
      <button
        className="text-gray-600 dark:text-white ml-1"
        onClick={handleDeleteItem}
      >
        <BiMinusCircle />
      </button>
    </div>
  );
};

// export const removeItemAtIndex = (arr, index) => {
//   return [...arr.slice(0, index), ...arr.slice(index + 1)];
// };
