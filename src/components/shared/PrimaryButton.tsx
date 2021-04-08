import cc from "classcat";
import type {LinkProps} from "next/link";
import Link from "next/link";
import type {DOMAttributes ,ReactNode, VFC} from "react";

type Common = {
  children: ReactNode;
  variant:"solid" | "outline" |"ghost";
  className?:string;
  coloredTextDefault?:boolean;
  type?: 'submit' | 'reset'| 'button';
};

type Button = Common & { button: boolean; onClick? : DOMAttributes<HTMLButtonElement>["onClick"] };

type Link = Common & { linkProps: LinkProps; external?: boolean };

const isButton = (props: Button | Link):props is Button => {
  return "button" in props;
};

export const PrimaryButton: VFC<Button | Link> = (props) => {
  const className = cc([
    props.className,
    "inline-flex items-center justify-center rounded-full",
    {
      "text-white rounded-3x1 shadow-md bg-blue-400 font-bold hover:bg-blue-300 duration-300": props.variant === "solid",
      "dark:text-white dark:hover:text-blue-400 ring-2 ring-blue-300 py-1 px-2 hover:bg-blue-50 dark:hover:bg-opacity-10 duration-300":props.variant === "outline",
      " hover:bg-blue-50 dark:text-white dark:hover:text-blue-400 dark:hover:bg-gray-50 dark:hover:bg-opacity-10 duration-300 rounded-3xl":props.variant === "ghost",
      "text-lightBlue-500": props.coloredTextDefault,
    },
  ]);

  return isButton(props) ? (
    <button type={props.type} onClick={props.onClick} className={className}>
     {props.children}
    </button>
  ) : (
    <Link {...props.linkProps}>
      <a
        className={className}
        target={props.external ? "_blank": undefined}
        rel={props.external ? "noopener noreferrer": undefined}
      >
        {props.children}
      </a>
    </Link>
  );
};
