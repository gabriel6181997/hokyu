//Import Libraries
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";

//Import Components
import { auth, db } from "src/firebase";
import { Layout } from "src/components/separate/layout";
import { Input } from "src/components/shared/Input";
import Link from "next/link";
import { ToddlerItem } from "src/components/separate/ToddlersItem";
import { log } from "node:console";

const SearchPage = () => {
  const router = useRouter();
  const [
    toddlerInfos,
    setToddlerInfos,
  ] = useState<firebase.firestore.DocumentData[]>([]);
  const [searchInput, setSearchInput] = useState("");

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

  const resultsofToddlers = toddlerInfos.filter((toddlerInfo) =>
    toddlerInfo.data.name.includes(searchInput)
  );

  console.log(toddlerInfos)


  const search: ChangeEventHandler<HTMLInputElement>["onChange"] = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Layout addbutton sideMenu buttonNavigation title="検索">
      <div className=" container pt-10">
        <Input
          id="search"
          placeholder="幼児を検索"
          variant="box"
          value={searchInput}
          onChange={search}
        />
        <p className="mt-12 text-xl">検索結果</p>
        <div className="mt-4">
          {searchInput.trim() &&
            resultsofToddlers.map(({ id, data }) => (
              <li
                key={id}
                className="border-b dark:border-gray-400 md:hover:bg-blue-50 duration-300 md:dark:hover:text-blue-400 md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-20"
              >
                <Link href={`/posts/${id}`} key={id} passHref>
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
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
