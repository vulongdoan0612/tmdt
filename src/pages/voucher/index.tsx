import ModalPayment from "@/components/ModalPayment";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { Button } from "antd";
import { useState } from "react";

const Voucher = () => {
      const [isModalVisibleEdit, setIsModalVisibleEdit] =
        useState<boolean>(false);
    const [value,setValue]=useState('')
   const handleCloseModalEditMovie = () => {
     setIsModalVisibleEdit(false);
    }; 
    const handleOpenModal = (item:string) => {
        setIsModalVisibleEdit(true)
        setValue(item)
    }
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="voucher">
        <div className="wrapper-voucher">
          <div className="voucher-box ">
            <div className="title">200D</div>
            <div className="info">
              <span>Xem phim tốt</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
            </div>
          </div>
          <Button onClick={() => handleOpenModal("vip1")}>Mua Gói</Button>
        </div>
        <div className="wrapper-voucher">
          <div className="voucher-box ">
            <div className="title">200D</div>
            <div className="info">
              <span>Xem phim tốt</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
            </div>
          </div>
          <Button onClick={() => handleOpenModal("vip2")}>Mua Gói</Button>
        </div>{" "}
        <div className="wrapper-voucher">
          <div className="voucher-box ">
            <div className="title">200D</div>
            <div className="info">
              <span>Xem phim tốt</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
              <span>Không quảng cáo</span>
              <span>Gía rẻ</span>
              <span>Đa thiết bị</span>
            </div>
          </div>
          <Button onClick={() => handleOpenModal("vip3")}>Mua Gói</Button>
        </div>
      </div>
          <ModalPayment
              vip={value}
        open={isModalVisibleEdit}
        handleCancel={handleCloseModalEditMovie}
      ></ModalPayment>
    </Page>
  );
};
export default Voucher;
