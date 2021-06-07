//Import Libraries
import type firebase from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "src/components/separate/Layout";
import { ToddlerItem } from "src/components/separate/ToddlersItem";
//Import Components
import { auth, db } from "src/firebase";

const IndexPage = () => {
  const router = useRouter();
  const [
    toddlerInfos,
    setToddlerInfos,
  ] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    db.collection("toddlers")
      .orderBy("urgency", "desc")
      .get()
      .then((toddler) => {
        return setToddlerInfos(
          toddler.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
      });
  }, []);

  return (
    <Layout addbutton sideMenu buttonNavigation title="ホーム">
      <ul>
          {toddlerInfos.map(({ id, data }) => {
            return (
              <li
                key={id}
                className="border-b dark:border-gray-400 md:hover:bg-blue-50 duration-300 md:dark:hover:text-blue-400 md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-20"
              >
                <Link href="/toddlers/id">
                  <ToddlerItem
                    age={data.age}
                    toddlerphoto={data.toddlerphoto}
                    name={data.name}
                    urgency={data.urgency}
                    gender={data.gender}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </Layout>
  );
};

export default IndexPage;

{/* // <div className="shadow rounded-md p-4  w-full mx-auto">
  //   <div className="animate-pulse flex">
  //     <div className="rounded-full bg-gray-200 h-28 w-28 mr-7"></div>
  //     <div className="ms:w-1/3 w-1/2 space-y-5 py-7">
  //       <div className="w-24 h-6 bg-gray-200 rounded"></div>
  //       <div className="space-y-2 w-11 h-4 bg-gray-200 rounded "></div>
  //     </div>

  //     <div className=" space-y-3 py-7">
  //       <div className="ml-2 h-4 bg-gray-200 rounded w-12"></div>
  //       <div className="ml-3 h-11 space-y-2 bg-gray-200 rounded w-10"></div>
  //     </div>

  //     <div className="ml-auto bg-gray-200 w-8 h-14 mt-9"></div>
  //   </div>
  // </div> */}
