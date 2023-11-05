import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { Button, Form, Input, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { setAuthenticate } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { UploadOutlined } from "@ant-design/icons";
import { uploadMovie } from "@/services/account";
const { TextArea } = Input;

const ModalAddMovie = ({ isEdit, open, handleCancel, selectedItem }: any) => {
  const [form] = Form.useForm<{ plan: string }>();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const [fileList, setFileList] = useState<any[]>([]);
  const [fileListThumbnail, setFileListThumbnail] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    try {
        const token = localStorage.getItem("access_token");

      if (fileList.length > 0) {
        const info = {
            author: values.author,
            movieName: values.movieName,
            actor: values.actor,
            dateRelease: values.dateRelease,

            // Thay đổi thuộc tính "plan"
          };
        const response = await uploadMovie({ movies: fileList},{thumbnails: fileListThumbnail}, token,info);
    console.log(response)
      }
  
    } catch (error) {
      console.log(error);
    }
    handleCancel()
  };
  const onChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const onChangeThumbnail = ({ fileList }: any) => {
    console.log(fileList)
    setFileListThumbnail(fileList);
  };
  return (
    <CustomModal
      title={"Tạo phim"}
      open={open}
      onCancel={handleCancel}
      className="modal-banner"
    //   width={"50vw"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        
      >
        <Form.Item
          name="author"
          label="Đạo diễn"
          rules={[{ required: true, message: "Đạo diễn is required" }]}
        >
          <Input
            placeholder="Đạo diễn"
          />
        </Form.Item>
        <Form.Item
          name="movieName"
          label="Tên Phim"
          rules={[{ required: true, message: "Tên Phim is required" }]}
        >
          <Input
            placeholder="Tên Phim"
          />
        </Form.Item>
        <Form.Item
          name="actor"
          label="Diễn viên"
          rules={[{ required: true, message: "Diễn viên is required" }]}
        >
          <Input
            placeholder="Diễn viên"
          />
        </Form.Item>
        <Form.Item
          name="dateRelease"
          label="Ngày sản xuất"
          rules={[{ required: true, message: "Ngày sản xuất is required" }]}
        >
          <Input
            placeholder="Ngày sản xuất"
          />
        </Form.Item>
        <Upload
              onChange={onChange}
              fileList={fileList}
              listType="picture-card"
              maxCount={1}
              name="movies"
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
            <Upload
              onChange={onChangeThumbnail}
              fileList={fileListThumbnail}
              maxCount={1}
              name="thumbnails"
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
        <div
          className="column-buttons flex justify-end"
          style={{ marginTop: "24px" }}
        >
          <Button htmlType="submit" type="primary">
            Edit
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default ModalAddMovie;
