import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import CustomModal from "../CustomModal";
import { useState } from "react";
import { buyVoucher, createVoucher, editVoucher } from "@/services/account";
import { toast } from "react-toastify";

const ModalEditVoucher = ({ selectedItemVoucher,getListVoucher, open, handleCancel }: any) => {
  //   const [value, setValue] = useState(1);
  const [form] = Form.useForm();
  console.log(selectedItemVoucher);
  const onFinish = async (values: any) => {
    console.log(values);
    const token = localStorage.getItem("access_token");
    console.log(selectedItemVoucher);
    const data = await editVoucher({
      newVoucherData: values,
      voucherId: selectedItemVoucher._id,
    });
    console.log(data);
    toast.success(data.data.message);
      getListVoucher();
      handleCancel();
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleAdd = async () => {
    // const token = localStorage.getItem("access_token");
    // const data = await buyVoucher({ typeOfVoucher: vip }, token);
    // toast.success(data.data.message);
    // handleCancel();
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <CustomModal
      title={"Sửa Voucher"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
      //   width={"50vw"}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="voucher"
          label="Tên voucher"
          rules={[{ required: true, message: "Diễn viên is required" }]}
        >
          <Input placeholder="Tên voucher" />
        </Form.Item>
        <Form.Item
          name="detail"
          label="Thêm Detail"
          rules={[{ required: true, message: "Đạo diễn is required" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            optionLabelProp="label"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Button htmlType="submit">Sửa</Button>
      </Form>
    </CustomModal>
  );
};
export default ModalEditVoucher;
