import React from "react";
import { BiMinusCircle } from "react-icons/bi";
import { Input } from "src/components/shared/Input";
import { DatetimePicker } from "./DatetimePicker";

export const TemperatureList = () => {
  const onClickDelete = () => {
    alert("Delete Temperature");
  };

  return (
    <ul>
      <li className="flex items-center">
        <div className="flex-1">
         <DatetimePicker />
        </div>
        <div className="flex-1 ml-2">
          <Input
            id="temperature"
            placeholder="例：37°C"
            variant="underlined"
            className="text-sm"
          />
        </div>
        <button
          className="text-gray-600 dark:text-white ml-1"
          onClick={onClickDelete}
        >
          <BiMinusCircle />
        </button>
      </li>
    </ul>
  );
};
