/* eslint-disable react/destructuring-assignment */
import "src/styles/global.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { auth, db } from "src/firebase";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
