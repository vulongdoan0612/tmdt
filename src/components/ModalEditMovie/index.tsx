import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../CustomModal";
import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { setAuthenticate } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { UploadOutlined } from "@ant-design/icons";
import { editMovie, uploadMovie } from "@/services/account";
import { getAllFilmMaker } from "@/services/movie";
const { TextArea } = Input;

const ModalEditMovie = ({
  isEdit,
  open,
  handleCancel,
  selectedItem,
  setFilmMaker,
}: any) => {
  console.log(selectedItem);
  const [form] = Form.useForm<any>();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const [fileList, setFileList] = useState<any[]>([]);
  const [fileListThumbnail, setFileListThumbnail] = useState<any[]>([]);
  useEffect(() => {
    form.setFieldsValue({
      author: selectedItem?.author,
      movieName: selectedItem?.movieName,
      actor: selectedItem?.actor,
      category:selectedItem?.category,
      dateRelease: selectedItem?.dateRelease,
    });
  }, [
    form,
    selectedItem?.category,
    selectedItem?.author,
    selectedItem?.movieName,
    selectedItem?.actor,
    selectedItem?.dateRelease,
  ]);
const getData = async () => {
  const token = localStorage.getItem("access_token");

  const data = await getAllFilmMaker(String(token));
  setFilmMaker(data);
};
  const onFinish = async (values: any) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log(values, fileList);
      if (fileList.length > 0) {
        const info = {
          author: values.author,
          movieName: values.movieName,
          actor: values.actor,
          category:values?.category,
          dateRelease: values.dateRelease,
          // Thay đổi thuộc tính "plan"
        };
        const response = await editMovie(
          { movies: fileList },
          { thumbnails: fileListThumbnail },
          token,
          info,
          selectedItem._id
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      }
      
      getData()
    handleCancel();
  };
  const onChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const onChangeThumbnail = ({ fileList }: any) => {
    console.log(fileList);
    setFileListThumbnail(fileList);
  };
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  return (
    <CustomModal
      title={"Sửa Phim"}
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
          <Input placeholder="Đạo diễn" />
        </Form.Item>
        <Form.Item
          name="movieName"
          label="Tên Phim"
          rules={[{ required: true, message: "Tên Phim is required" }]}
        >
          <Input placeholder="Tên Phim" />
        </Form.Item>
        <Form.Item name="category" label="Thể loại">
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            tokenSeparators={[","]}
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="actor"
          label="Diễn viên"
          rules={[{ required: true, message: "Diễn viên is required" }]}
        >
          <Input placeholder="Diễn viên" />
        </Form.Item>
        <Form.Item
          name="dateRelease"
          label="Ngày sản xuất"
          rules={[{ required: true, message: "Ngày sản xuất is required" }]}
        >
          <Input placeholder="Ngày sản xuất" />
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
export default ModalEditMovie;
