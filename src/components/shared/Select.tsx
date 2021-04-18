import { forwardRef, VFC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn & {
  array: string[];
  label: string;
};

export const Select: VFC<Props> = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col text-sm">
      <label>{props.label}</label>
      <select className="my-2 py-2 px-2 shadow-md rounded-lg" name={props.label} ref={ref}>
        {props.array.map((item) => {
          return (
            <option className="bg-white" value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
});

Select.displayName === "Select";
