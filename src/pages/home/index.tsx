//Import Libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import {ToddlerItem} from "src/components/separate/ToddlersItem"


const IndexPage = () => {
  const router = useRouter();
  const [
    toddlerInfos,
    setToddlerInfos,
  ] = useState<firebase.firestore.DocumentData>([]);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [auth.currentUser]);

  useEffect(() => {
    db.collection("toddlers")
      .orderBy("urgency", "desc")
      .get()
      .then((toddler) =>
        setToddlerInfos(
          toddler.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, []);

  return (
    <Layout addbutton sideMenu buttonNavigation title="ホーム">
      <ul>
        {toddlerInfos.map(({ id, data }) => (
          <li
            key={id}
            className="border-b dark:border-gray-400 md:hover:bg-blue-50 duration-300 md:dark:hover:text-blue-400 md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-20"
          >
            <Link href="/" passHref>
               <ToddlerItem
                age={data.age}
                toddlerphoto={data.toddlerphoto}
                name={data.name}
                urgency={data.urgency}
                gender={data.gender}
              />
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;

