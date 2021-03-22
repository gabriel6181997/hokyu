import { Layout } from "src/components/separate/layout";
import { ToddlerItems } from "src/components/separate/ToddlersItems";
import { Input } from "src/components/shared/Input";

const SearchPage = () => {
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
