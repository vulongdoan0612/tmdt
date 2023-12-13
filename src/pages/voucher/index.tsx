import ModalPayment from "@/components/ModalPayment";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { getAllVoucher } from "@/services/account";
import { Button } from "antd";
import { useEffect, useState } from "react";

const Voucher = () => {
      const [isModalVisibleEdit, setIsModalVisibleEdit] =
        useState<boolean>(false);
  const [value, setValue] = useState('')
  const [dataVoucher,setDataVoucher]=useState<any>([])
   const handleCloseModalEditMovie = () => {
     setIsModalVisibleEdit(false);
  }; 
  const getData = async () => {
    const data = await getAllVoucher()
    console.log(data);
    setDataVoucher(data);
  }
  useEffect(() => {
    getData()
    console.log(dataVoucher);
  },[])
    const handleOpenModal = (item:string) => {
        setIsModalVisibleEdit(true)
        setValue(item)
    }
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="voucher">
        {dataVoucher?.data?.map((item:any,key:any) => {
          console.log(item)
          return (
            <div className="wrapper-voucher" key={key}>
              <div className="voucher-box ">
                <div className="title">{item.voucher}</div>
                <div className="info">

                  {item?.detail?.map((item: any, key: any) => {
                    return <span key={key}>{item}</span>;
                  })}
                  {/* {console.log(item.detail)} */}
                </div>
              </div>
              <Button onClick={() => handleOpenModal(item?.voucher)}>Mua Gói</Button>
            </div>
          );
        })}

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
