import { forwardRef, useState, VFC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { GiFemale,GiMale } from "react-icons/gi";

// type Props = UseFormRegisterReturn & {
//   register: any;
// }

export const GenderSwitch= forwardRef(( ref) => {
  const [gender, setGender] = useState(false);

  const handleChangeGender = () => {
    setGender(!gender);
  };

  return (
    <div>
      <input
        type="hidden"
        name="gender"
        value={gender ? "male" : "female"}
        ref={ref}
        // {...props.register}
      />
    <button
      className="text-3xl bg-white border border-gray-700 rounded-full p-1 "
      onClick={handleChangeGender}
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
})

GenderSwitch.displayName === "GenderSwitch";

