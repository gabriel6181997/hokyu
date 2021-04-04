//Import Libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";

//Import Icons
import { GiMale, GiFemale } from "react-icons/gi";

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
            <Link href="/">
              <a className="flex items-center py-3">
                <div className="w-32 h-32 pl-4 relative">
                  <img
                    src={data.toddlerphoto}
                    alt={data.name}
                    className="rounded-full"
                  />
                  <div className="absolute ms:bottom-4 bottom-2 right-0 ms:text-2xl text-3xl p-2 bg-white rounded-full border">
                    {data.gender === "male" ? (<div className="text-blue-400"><GiMale /></div>) : (<div className="text-rose-300"><GiFemale /></div>)}
                  </div>
                </div>
                <div className="w-3/6 pl-3">
                  <h2 className="text-xl md:text-2xl">{data.name}</h2>
                  <p className="text-lg pt-1 md:pt-3">{data.age}歳</p>
                </div>
                <div className="items-center w-1/6 text-center">
                  <p>緊急度:</p>
                  <p className="text-3xl md:text-5xl">{data.urgency}</p>
                </div>
                <p className="w-1/6 text-center text-2xl md:text-4xl">〉</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
