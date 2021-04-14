//Import Libraries
import type firebase from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEventHandler} from "react";
import { useEffect, useState } from "react";
import { Layout } from "src/components/separate/Layout";
import { ToddlerItem } from "src/components/separate/ToddlersItem";
import { Input } from "src/components/shared/Input";
//Import Components
import { auth, db } from "src/firebase";

const SearchPage = () => {
  const router = useRouter();
  const [toddlerInfos, setToddlerInfos] = useState<
    firebase.firestore.DocumentData[]
  >([]);
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
        {return setToddlerInfos(
          toddler.docs.map((doc) => {return { id: doc.id, data: doc.data() }})
        )}
      );
  }, []);

  const resultsofToddlers = toddlerInfos.filter((toddlerInfo) =>
    {return toddlerInfo.data.name.includes(searchInput)}
  );

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
     </div>
        <div className="mt-4">
          <ul>
            {searchInput.trim() &&
              resultsofToddlers.map(({ id, data }) => {return (
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
              )})}
          </ul>
        </div>
    </Layout>
  );
};

export default SearchPage;
