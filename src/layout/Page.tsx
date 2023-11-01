import FullScreenLoading from "@/components/FullScreanLoading";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";

interface PropsPage {
  title: string;
  loadingData?: boolean;
  children: React.ReactNode;
}
const TestimonialCard = dynamic(() => import("../components/Header/index"), {
  ssr: false,
});
const Page = (props: PropsPage) => {
    const { title, loadingData, children } = props;
      const page = useMemo(() => {
        if (loadingData) {
          return <FullScreenLoading />;
        }

        return <>{children}</>;
      }, [loadingData, children]);
  return (
    <div className="page-wrapper">
      <TestimonialCard></TestimonialCard>Page {title} {children}
      <ToastContainer></ToastContainer>

    </div>
  );
};
export default Page;
