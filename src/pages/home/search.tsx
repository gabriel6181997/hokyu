//Import Libraries
import { useEffect } from 'react'
import { useRouter } from "next/router";

//Import Components
import { auth } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { ToddlerItems } from "src/components/separate/ToddlersItems";
import { Input } from "src/components/shared/Input";

const SearchPage = () => {
  const router = useRouter();

  useEffect(()=> {
    if (!auth.currentUser){
      router.push('/')
    };
  },[auth.currentUser])

  return (
    <Layout addbutton sideMenu buttonNavigation title="検索">
      <div className=" container pt-10">
        <Input id="search" placeholder="幼児を検索" variant="box" />
        <p className="mt-12 text-xl">検索結果</p>
        <div className="mt-4">
         <ToddlerItems />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
