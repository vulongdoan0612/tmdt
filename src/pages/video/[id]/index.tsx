import ModalAds from "@/components/ModalAds";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { getFilm } from "@/services/movie";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Player } from "video-react";

const Video = () => {
  const router = useRouter();
  const { id } = router.query;
  const [film, setFilm] = useState<any>([]);
  const [ads, setAds] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(film);
  const getData = async () => {
    const token = localStorage.getItem("access_token");
    if (id) {
      const data = await getFilm({ id: String(id) });
      console.log(data);
      setFilm(data); // Cập nhật state film với dữ liệu từ API
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  useEffect(() => {
    getData();
  }, [id]);
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 10);
  },[]);
  const handleAds = () => {
    setOpen(true);
  };
  const { account } = useSelector((state: RootState) => state.auth);

  const [time, setTime]=useState(0);
  console.log(account);
      useEffect(() => {
        if (account?.voucher === null) {
          setTime(10000);
        } else if (account?.voucher === "vip1") {
          setTime(8000);
        } else if (account?.voucher === "vip2") {
          setTime(6000);
        } else if (account?.voucher === "vip3") {
          setTime(0);
        }
      }, []);
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="video-page">
        <Player
          playsInline
          poster={film?.data?.thumbnails}
          src={film?.data?.movies}
        />
        <div className="description">
          <h1 className="title">{film?.data?.movieName}</h1>
          <span className="author">Đạo diễn: {film?.data?.author}</span>
          <span className="date">Ngày sản xuất: {film?.data?.dateRelease}</span>
          <span className="actor">Diễn viên: {film?.data?.actor}</span>
        </div>
      </div>
      {account?.voucher !== "vip3" && (
        <ModalAds
          open={open}
          handleCancel={handleCancel}
          time={time}
        ></ModalAds>
      )}
    </Page>
  );
};
export default Video;
