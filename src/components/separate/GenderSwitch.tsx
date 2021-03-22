import { useState } from "react";
import { GiMale, GiFemale } from "react-icons/gi";

export const GenderSwitch = () => {
  const [gender, setGender] = useState(false);

  const onClickChangeGender = () => {
    setGender(!gender);
  };

  return (
    <div>
      <input
        type="hidden"
        name="gender"
        value={gender ? "male" : "female"}
      />
    <button
      className="text-3xl bg-white border border-gray-700 rounded-full p-1 "
      onClick={onClickChangeGender}
    >
      <div className="relative">
        {gender ? (
          <span className="text-blue-400">
            <GiMale />
          </span>
        ) : (
          <span className="text-rose-300">
            <GiFemale />
          </span>
        )}
      </div>
    </button>
    </div>
  );
};
