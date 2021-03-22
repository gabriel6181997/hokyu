import { Layout } from "src/components/separate/layout";
import { ToddlerItems } from "src/components/separate/ToddlersItems";

const IndexPage = () => {
  return (
    <Layout addbutton sideMenu buttonNavigation title="ホーム">
      <ToddlerItems />
    </Layout>
  );
};

export default IndexPage;

