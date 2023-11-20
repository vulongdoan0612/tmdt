import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Switch,
} from "antd";
import CustomModal from "../CustomModal";
import { useState } from "react";
import { buyVoucher, createVoucher, getAllFilm } from "@/services/account";
import { toast } from "react-toastify";
import { updateCensorship } from "@/services/movie";

const ModalCensorShip = ({setFilmMaker,
  setFilmMakerAll,selectItem,
  open,
  handleCancel,
  getAll,
}: any) => {
  //   const [value, setValue] = useState(1);
  const [form] = Form.useForm();
  console.log(selectItem);
  const getDataAll = async () => {
    const token = localStorage.getItem("access_token_admin");

      const data = await getAllFilm(String(token), {});
      setFilmMakerAll(data)
    console.log(data);
  };
  const onFinish = async (values: any) => {
    const token = localStorage.getItem("access_token");
    const data = await updateCensorship(selectItem?._id, values?.voucher);
    toast.success(data.data.message);
    handleCancel();
      getDataAll();
      getData();
  };
  const getData = async () => {
    const token = localStorage.getItem("access_token_admin");

    const data = await getAllFilm(String(token), { censorship: "true" });
    setFilmMaker(data);
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    // setValue(e.target.value);
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
      title={"Tạo voucher"}
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
        <Form.Item name="voucher" label="Lựa chọn trạng thái">
          <Switch
            checkedChildren="Kiểm duyệt"
            unCheckedChildren="Không kiểm duyệt"
            // defaultChecked
          />
        </Form.Item>

        <Button htmlType="submit">Thay đổi</Button>
      </Form>
    </CustomModal>
  );
};
export default ModalCensorShip;
