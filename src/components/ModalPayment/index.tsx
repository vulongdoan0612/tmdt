import { Button, Form, Input, Radio, RadioChangeEvent, Space } from "antd";
import CustomModal from "../CustomModal";
import { useState } from "react";
import { buyVoucher } from "@/services/account";
import { toast } from "react-toastify";

const ModalPayment = ({ vip,open, handleCancel }: any) => {
      const [value, setValue] = useState(1);

    const onFinish = (values: any) => {
        console.log(value);
        handleCancel()
    }
        console.log(vip)
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    };
    const handleBuy = async () => {
        const token = localStorage.getItem("access_token");
        const data = await buyVoucher({ typeOfVoucher: vip }, token);
        toast.success(data.data.message)
        handleCancel();

    }
  return (
    <CustomModal
      title={vip}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      //   width={"50vw"}
    >
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="author"
          label="Chọn Phương Thức Thanh Toán"
          rules={[{ required: true, message: "Đạo diễn is required" }]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
              <Radio value={4}>
                More...
                {value === 4 ? (
                  <Input style={{ width: 100, marginLeft: 10 }} />
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Button onClick={handleBuy}>Mua</Button>
    </CustomModal>
  );
};
export default ModalPayment;
