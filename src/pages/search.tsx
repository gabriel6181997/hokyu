import { Layout } from "src/components/separate/layout";
import { Input } from "src/components/shared/Input";

const SearchPage = () => {
  return (
    <Layout sideMenu buttonNavigation>
      <div className=" container mt-10">
        <Input id="search" placeholder="幼児を検索" variant="box" />
      </div>
    </Layout>
  );
};

export default SearchPage;
