import cc from "classcat";
import type {InputHTMLAttributes, TextareaHTMLAttributes, VFC} from "react";
import TextAreaAutoSize from "react-textarea-autosize";

type Props = {
  className?:string;
  error?: string;
  id:string;
  placeholder?:string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];onChangeTextarea?:TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
  textarea?:boolean;
  variant: "underlined" | "box";
};

export const Input:VFC<Props> = (props) => {
  const className = cc([
    props.className,
    "block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none",
    {
      "border-b-2 focus:border-blue-400": props.variant === "underlined",
      "border-2 focus:border-blue-400": props.variant === "box",
    }
  ]);

  return(
    <>
      {props.textarea? (
        <TextAreaAutoSize
         id={props.id}
         name={props.id}
         onChange={props.onChangeTextarea}
         placeholder={props.placeholder}
         className={className}
         minRows={3}
        />
        ) : (
        <input
          type="text"
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          className={className}
          onChange={props.onChange}
        />
        )
      }
    </>
  );
};
