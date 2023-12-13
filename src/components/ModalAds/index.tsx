import {
  Button,
  Form,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Space,
  Statistic,
} from "antd";
import Countdown from "react-countdown";

import CustomModal from "../CustomModal";
import { useEffect, useState } from "react";
import { buyVoucher } from "@/services/account";
import { toast } from "react-toastify";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getStar } from "@/services/admin";

const ModalAds = ({ setValue,id, open, handleCancel, time }: any) => {
  const [value, setValueD] = useState(1);
  const [on, setOn] = useState(false);

  const onFinish = async (values: any) => {
    try {
      
      handleCancel();
    }
    catch {
      // 
    }
  };
  const handleClose = async () => {
    // const data = await getStar({ idMovie: id });
    // console.log(data, "Dddddddddddddddddddddddddddddddddddd", id);
    // setValue(data?.data?.averageRating);
    handleCancel();
  };

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <span onClick={handleClose}>Skip</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  const { account } = useSelector((state: RootState) => state.auth);

  console.log(account?.voucher);
  return (
    <CustomModal
      title={"Quảng cáo"}
      open={open}
      onCancel={handleCancel}
      className="modal-ads"
      width={"80vw"}
      maskClosable={false}
      //   width={"50vw"}
    >
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <div>
          {/* <video
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            width={810}
            height={400}
          >
            <source
              src="ads.mp4"
              type="video/mp4"
              width={600}
              height={600}
            />
          </video> */}
          <Image src='/images/ads.png' preview={false} alt=""></Image>
        </div>
        <Button className={`${on ? "enable" : "disable"}`}>
          {/* <Countdown value={Date.now() + 15 * 1000}/>{" "} */}
          {account?.voucher && (
            <Countdown
              date={
                Date.now() +
                Number(
                  account?.voucher === "Gói 1 tháng"
                    ? 10000
                    : account?.voucher === "Gói 3 tháng"
                    ? 6000
                    : account?.voucher === "Gói 6 tháng"
                    ? 3000
                    : 0
                )
              }
              renderer={renderer}
            />
          )}
        </Button>
      </Form>
    </CustomModal>
  );
};
export default ModalAds;
