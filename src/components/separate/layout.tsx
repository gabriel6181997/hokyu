//import libraries
import Head from "next/head";
import Link from "next/link";
import type { ReactNode, VFC } from "react";
//import logos
import { BsPencilSquare } from "react-icons/bs";
import { RecoilRoot, RecoilState } from "recoil";
import { ButtonNavigation } from "src/components/separate/ButtonNavigation";
//import components
import { Header } from "src/components/separate/Header";
import { SideMenu } from "src/components/separate/SideMenu";

type Props = {
  addbutton?: boolean;
  buttonNavigation: boolean;
  children: ReactNode;
  header?: boolean;
  meta?: {
    pageName?: string;
    description?: string;
  };
  sideMenu?: boolean;
  title: string;
};

export const Layout: VFC<Props> = (props) => {
  const meta = {
    title: props.meta?.pageName
      ? `${props.meta.pageName} - Hokyu`
      : "Hokyu - 保育士向けの緊急アプリ",
    description:
      "Hokyuは、保育園で幼児が急病した時、保育士が簡単に急病した幼児の最新健康状況を確認するアプリです。",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
      </Head>

      <div className="w-full max-w-6xl mx-auto mb-auto md:grid md:grid-cols-12">
        {props.sideMenu ? (
          <div className="hidden md:block md:col-span-3">
            <SideMenu />
          </div>
        ) : null}
        <div className={props.sideMenu ? "md:col-span-9" : "md:col-span-12"}>
          <Header title={props.title} />
          <main className="md:border-l  md:border-r">{props.children}</main>
          {props.buttonNavigation ? (
            <div className="mx:block md:hidden">
              <ButtonNavigation />
            </div>
          ) : null}

          {props.addbutton ? (
            <Link href="/home/add">
              <button className="mx:block md:hidden fixed right-5 bottom-20 text-xl border-2 rounded-full border-gray-500 p-3 bg-white dark:bg-gray-900 dark:border-white">
                <BsPencilSquare />
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};
