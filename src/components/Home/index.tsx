import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Image } from "antd";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          
            <a href="/truyenhinh"><Image src="/images/truyenhinh.png" alt="" preview={false}></Image></a>
          
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/tructiep.png" alt="" preview={false}></Image>
          
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/phimbo.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/thieunhi.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/thethao.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/phimle.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/anime.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/giaitri.png" alt="" preview={false}></Image>
          {" "}
        </SwiperSlide>
        <SwiperSlide>
          
            <Image src="/images/podcast.png" alt="" preview={false}></Image>
          {" "}
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
    </div>
  );
};
export default Home;
