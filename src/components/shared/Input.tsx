import cc from "classcat";
import type {VFC} from "react";
import TextAreaAutoSize from "react-textarea-autosize";

type Props = {
  className?:string;
  error?: string;
  id:string;
  placeholder?:string;
  textarea?:boolean;
  variant: "underlined";
};

export const Input:VFC<Props> = (props) => {
  const className = cc([
    props.className,
    "block w-full pl-2 bg-transparent focus:outline-none",
    {
      "border-b-2 focus:border-blue-400": props.variant === "underlined",
    }
  ]);

  return(
    <>
      {props.textarea? (
        <TextAreaAutoSize
         id={props.id}
         name={props.id}
         placeholder={props.placeholder}
         className={className}
        />
        ) : (
        <input
          type="text"
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          className={className}
        />
        )
      }
    </>
  );
};
