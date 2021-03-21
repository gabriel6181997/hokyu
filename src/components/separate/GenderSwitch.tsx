import { useState } from "react";
import { GiMale, GiFemale } from "react-icons/gi";

export const GenderSwitch = () => {
  const [gender, setGender] = useState("male");

  const onClickChangeGender = () => {
    alert("Change Gender!")
    // setGender(!gender)
  };

  return (
    <button
      className="text-3xl bg-white border border-gray-700 rounded-full p-1 "
      onClick={onClickChangeGender}
    >
      <label className="relative">
        <input
          type="radio"
          name="gender"
          className="absolute top-0 left-0 opacity-0"
          value={gender === "male" ? "male" : "female"}
        />
        <span className="text-blue-400">
          <GiMale />
        </span>
        {/* <span className="text-rose-300"><GiFemale /></span> */}
      </label>
    </button>
  );
};
