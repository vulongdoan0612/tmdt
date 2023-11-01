import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import Home from "@/components/Home";

export default function index() {
  return (
    <Page title={PAGE_TITLE.HOME} loadingData={false}>
      <Home></Home>
    </Page>
  );
}
