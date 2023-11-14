import {
  Button,
  Form,
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

const ModalAds = ({ open, handleCancel, time }: any) => {
  const [value, setValue] = useState(1);
  const [on, setOn] = useState(false);

  const onFinish = (values: any) => {
    console.log(value);
    handleCancel();
  };
  const handleClose = () => {
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
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            width={810}
            height={400}
          >
            <source
              src="https://pic.pikbest.com/17/95/89/04X888piCvmB.mp4"
              type="video/mp4"
              width={600}
              height={600}
            />
          </video>
        </div>
        <Button className={`${on ? "enable" : "disable"}`}>
          {/* <Countdown value={Date.now() + 15 * 1000}/>{" "} */}
          {account?.voucher && (
            <Countdown
              date={
                Date.now() +
                Number(
                  account?.voucher === 'vip0'
                    ? 10000
                    : account?.voucher === "vip1"
                    ? 6000
                    : account?.voucher === "vip2"
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
