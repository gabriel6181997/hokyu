import React from 'react';
import { DarkModeSwitch } from "src/components/separate/DarkModeSwitch"

export const Header = () => {

  return (
    <header className="flex items-center h-14 md:h-20 justify-between bg-blue-200">
      <h1 className="pl-8 font-bold text-2xl md:text-3xl">ホーム</h1>
      <div className="mr-10">
        <DarkModeSwitch />
      </div>
    </header>
  );
};
