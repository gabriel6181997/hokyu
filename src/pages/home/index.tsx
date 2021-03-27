//Import Libraries
import { useEffect } from 'react'
import { useRouter } from "next/router";

//Import Components
import { auth } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { ToddlerItems } from "src/components/separate/ToddlersItems";

const IndexPage = () => {
  const router = useRouter();

  useEffect(()=> {
    if (!auth.currentUser){
      router.push('/')
    };
  },[auth.currentUser])

  return (
    <Layout addbutton sideMenu buttonNavigation title="ホーム">
      <ToddlerItems />
    </Layout>
  );
};

export default IndexPage;

