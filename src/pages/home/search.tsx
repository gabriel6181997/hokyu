//Import Libraries
import type firebase from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/router";
import type { InputHTMLAttributes} from "react";
import { useEffect, useState } from "react";
import { Layout } from "src/components/separate/Layout";
import { ToddlerItem } from "src/components/separate/ToddlersItem";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=> {
    const unSub = db.collection("toddlers").orderBy("urgency", "desc").onSnapshot((snapshot)=> {
      setToddlerInfos(
        // eslint-disable-next-line arrow-body-style
        snapshot.docs.map((doc)=> ({
          id: doc.id,
          data:doc.data()
        }))
      )
    });

    // eslint-disable-next-line arrow-body-style
    return () => unSub();
  },[])

  const resultsOfToddlers = toddlerInfos.filter((toddlerInfo) =>
    {return toddlerInfo.data.name.includes(searchInput)}
  );

  const handleSearch: InputHTMLAttributes<HTMLInputElement>["onChange"]  = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Layout addbutton sideMenu buttonNavigation title="検索">
      <div className=" container pt-10">
        <input
          name="search"
          placeholder="幼児を検索"
          value={searchInput}
          onChange={handleSearch}
          className="block w-full pl-2 bg-transparent dark:bg-gray-900 focus:outline-none border-2 focus:border-blue-400"
        />
        <p className="mt-12 text-xl">検索結果</p>
     </div>
        <div className="mt-4">
          <ul>
            {searchInput.trim() &&
              resultsOfToddlers.map(({ id, data }) => {return (
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
