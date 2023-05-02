import { Outlet } from "react-router";
import { Layout } from "../../components/layout";

export const Root = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
