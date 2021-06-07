import cc from "classcat";
import type { VFC } from "react";
import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import TextAreaAutoSize from "react-textarea-autosize";

type Props = UseFormRegisterReturn & {
  className?: string;
  error?: string;
  placeholder?: string;
  name:string;
  textarea?: boolean;
  type?: string;
  variant: "underlined" | "box";
  value?: string | number;
  defaultValue?: string;
};

export const Input: VFC<Props> = forwardRef((props, ref) => {
  const className = cc([
    props.className,
    "block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none",
    {
      "border-b-2 focus:border-blue-400": props.variant === "underlined",
      "border-2 focus:border-blue-400": props.variant === "box",
    },
  ]);

  return (
    <>
      {props.textarea ? (
        <TextAreaAutoSize
          name={props.name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={className}
          minRows={3}
          value={props.value}
          defaultValue={props.defaultValue}
          ref={ref}
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          className={className}
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          ref={ref}
        />
      )}
    </>
  );
});

Input.displayName === "Input";
