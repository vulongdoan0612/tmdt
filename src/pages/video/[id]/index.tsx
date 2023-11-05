import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { getFilm } from "@/services/movie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Player } from "video-react";

const Video = () => {
  const router = useRouter();
  const { id } = router.query;
  const [film, setFilm] = useState<any>([]);
  const [ads,setAds]=useState(false)
  console.log(id);
  const getData = async () => {
    const token = localStorage.getItem("access_token");
    if (id) {
      const data = await getFilm({ id: String(id) });
      console.log(data);
      setFilm(data); // Cập nhật state film với dữ liệu từ API
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div>
        <Player
          playsInline
          poster={film?.data?.thumbnails}
          src={film?.data?.movies}
        />
      </div>
    </Page>
  );
};
export default Video;
