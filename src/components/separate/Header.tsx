import type { VFC } from "react";
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch";

type Props = {
  title: string;
}

export const Header: VFC<Props> = (props) => {

  return (
    <header className="flex items-center h-14 md:h-20 justify-between bg-blue-200 sticky top-0 z-100">
      <h1 className="pl-8 font-bold dark:text-gray-700 text-2xl md:text-3xl">{props.title}</h1>
      <div className="mr-10">
        <DarkModeSwitch />
      </div>
    </header>
  );
};
