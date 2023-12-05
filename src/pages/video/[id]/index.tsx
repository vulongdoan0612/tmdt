import Comment from "@/components/Comment";
import ModalAds from "@/components/ModalAds";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { addFav, getComment, getStar, postComment, postStar } from "@/services/admin";
import { getFilm } from "@/services/movie";
import { Button, Form, Image, Input, Modal, Rate } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Player } from "video-react";

const Video = () => {
  const router = useRouter();

  const { id } = router.query;
  const [film, setFilm] = useState<any>([]);
  const [cmt, setCmt] = useState<any>([]);

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
const [hasFetched, setHasFetched] = useState(false);

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  useEffect(() => {
    getData();
  }, [id]);
  const getAllComment = async () => {
    if (film?.data) {
      const data = await getComment({ idMovie: film?.data?._id });
      setCmt(data);
    }
  };
  useEffect(() => {
    getAllComment();
  }, [film.data]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (film?.data) {
      getDataStarAvg();
    }
  }, [film?.data]);
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 10);
  }, []);
  const handleAds = () => {
    setOpen(true);
  };
  const { account } = useSelector((state: RootState) => state.auth);
  const onFinish = async (value: any) => {
    try {
      const data = {
        idMovie: film?.data?._id,
        username: account?.username,
        comment: value.comment,
        avatar: account?.avatar,
      };
      await postComment(data);

      console.log(data);
    } finally {
      await getAllComment();
    }
  };
  const [time, setTime] = useState(0);
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
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const onStar = async (e: any) => {
    try {
      setValue(e);
      const newData = {
        idMovie: film?.data?._id,
        username: account?.username,
        star: Number(e),
      };
      await postStar(newData);
    } finally {
      // await getDataStarAvg();
    }
  };
  const getDataStarAvg = async () => {
    const data = await getStar({ idMovie: film?.data?._id });
    console.log(data);
    setValue(data?.data?.averageRating);
  };
   if (value === undefined) {
     return <div>Loading...</div>; // Hiển thị loading hoặc nội dung khác tùy thuộc vào trường hợp của bạn
   }
  console.log(value)
  // console.log(value);
  const handleAddFav = async () => {
    try {

      const daz = {
        idMovie: film?.data?._id,
        userId: account._id
      };
     const data= await addFav(daz);
    toast.success(data.data.message)
    }
    catch {
      // 
    }
  }
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="video-page">
        <Player
          playsInline
          poster={film?.data?.thumbnails}
          src={film?.data?.movies}
        />
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div className="description">
            <h1 className="title">{film?.data?.movieName}</h1>
            <span className="author">Đạo diễn: {film?.data?.author}</span>
            <span className="date">Ngày sản xuất: {film?.data?.dateRelease}</span>
            <span className="actor">Diễn viên: {film?.data?.actor}</span>
            <Rate tooltips={desc} onChange={(e) => onStar(e)} value={value} />
            {value ? <span>{desc[value - 1]}</span> : ""}
          </div>
          <Button onClick={handleAddFav}>Thêm vào danh sách yêu thích</Button>
        </div>
      </div>
      <div className="comment-wrapper">
        {account?.voucher ? (
          <div className="add-comment">
            <div className="avatar">
              {" "}
              <Image src={account.avatar} preview={false} alt=""></Image>
            </div>
            <div className="right-comment">
              <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: "Please comment!",
                    },
                  ]}
                >
                  <Input placeholder="Comment" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="comment-part">
          {cmt?.data?.comment?.length > 0 ? (
            cmt?.data?.comment?.map((item: any) => {
              return (
                <div key={item?._id}>
                  <div className="comment-2">
                    <div className="avatar">
                      <Image src={item?.avatar} alt="" preview={false}></Image>
                    </div>
                    <div className="right-comment">
                      <span className="author">{item?.username}</span>
                      <span className="content">{item?.comment}</span>
                      <span>{item?.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ color: "white" }}>Chưa có bình luân</div>
          )}
        </div>
      </div>

      {account?.voucher !== "vip3" && (
        <ModalAds
          setValue={setValue}
          id={film?.data?._id}
          open={open}
          handleCancel={handleCancel}
          time={time}
        ></ModalAds>
      )}
    </Page>
  );
};
export default Video;
