import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import { Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAllFilm } from "@/services/account";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const [films, setFilms] = useState<any>([]);
  const router = useRouter();
    const { account } = useSelector((state: RootState) => state.auth);
const [open,setOpen]=useState(false)
  const getFilm = async () => {
    const token = localStorage.getItem("access_token");

    const data = await getAllFilm(String(token));
    setFilms(data);
  };
  useEffect(() => {
    getFilm();
  }, []);
  const handleRouter = (item: any) => {
    if (account?.username !== undefined) {
      router.push(`/video/${item}`);
    } else {
      setOpen(true)
    }
    
  };
   const handleCancel = () => {
     setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
  };
  return (
    <div className="home-wrapper">
      <h1 className="title">Danh mục</h1>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <a href="/truyenhinh">
            <Image src="/images/truyenhinh.png" alt="" preview={false}></Image>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/tructiep.png" alt="" preview={false}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/phimbo.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/thieunhi.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/thethao.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/phimle.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/anime.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/giaitri.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/podcast.png" alt="" preview={false}></Image>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/hoctap.png" alt="" preview={false}></Image>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Image src="/images/K+.png" alt="" preview={false}></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/v-league.png" alt="" preview={false}></Image>
        </SwiperSlide>
      </Swiper>
      <h1 className="title">Mới ra mắt</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper-movie"
      >
        <div>
          {films?.data?.map((item: any, index: any) => {
            return (
              <SwiperSlide key={index}>
                <div onClick={() => handleRouter(item._id)}>
                  <Image src={item?.thumbnails} preview={false} alt=""></Image>
                  <h1 style={{ color: "white" }}>{item?.movieName}</h1>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
      <Modal
        open={open}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        Vui lòng đăng nhập để xem phim
      </Modal>
    </div>
  );
};
export default Home;
