import { Layout } from "src/components/separate/layout";
import { ToddlerItems } from "src/components/separate/ToddlersItems";

const IndexPage = () => {
  return (
    <Layout addbutton sideMenu buttonNavigation>
      <ToddlerItems />
    </Layout>
  );
};

export default IndexPage;

