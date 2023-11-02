import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";

const truyenhinh = () => {
  return (
    <Page title={PAGE_TITLE.LOGIN} loadingData={false}>
      <h1>Truyền hình</h1>
    </Page>
  );
};
export default truyenhinh;
