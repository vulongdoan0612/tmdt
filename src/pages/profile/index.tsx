import ModalAvatar from "@/components/ModalAvatar";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { setAuthenticate } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { getProfile, getProfileFilmMaker, logout } from "@/services/account";
import { delFav } from "@/services/admin";
import { Button, Image, Modal, Table, TableProps, Tabs } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const { account, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    const role = localStorage.getItem("role");
    if (role === "user" && token) {
      try {
        if (token && refresh_token) {
          dispatch(setAuthenticate({ loading: true }));
          const response = await getProfile(
            String(token),
            String(refresh_token)
          );
          if (response?.user) {
            dispatch(
              setAuthenticate({
                isAuthenticated: true,
                account: response?.user,
                loading: false,
              })
            );
          }
        }
      } catch {
        console.log("error");
      }
    }
  };
  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleCloseModalEdit = () => {
    setIsModalVisible(false);
  };
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsModalVisible(true);
  };
  const logOut = () => {
    setOpen(true);
    //  router.push("/");
    //  logout(dispatch);
  };
  const handleOk = () => {
    router.push("/");
    logout(dispatch);
    setConfirmLoading(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const columnsListJob: TableProps<any>["columns"] = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên Voucher",
      dataIndex: "typeOfVoucher",
      key: "typeOfVoucher",
      fixed: "left",
    },
    {
      title: "Thời gian mua",
      dataIndex: "date",
      key: "date",
    },
  ];
  const handleDelete = async (record: any) => {
    const newData = {
      idMovie: record.id,
      userId: account?._id,
    };
    // console.log(record);
    const data = await delFav(newData);
    toast.success(data.data.message);
    fetchData();
  };
  const columnsListJob2: TableProps<any>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{id}</span>,
    },
    {
      title: "Tên Phim",
      dataIndex: "movieName",
      key: "movieName",
      fixed: "left",
      render: (movieName) => <span>{movieName}</span>,
    },
    {
      title: "Hình Phim",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => (
        <Image
          src={thumbnail}
          alt="Thumbnail"
          preview={false}
          style={{ width: "100px", height: "auto" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (_, record) => (
        <>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
          <a href={`/video/${record.id}`}><Button>Xem phim </Button></a>
        </>
      ),
    },
  ];
  console.log(account);
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="profile-page-wrapper">
        <span
          style={{
            color: "white",
            textAlign: "right",
            marginBottom: "3rem",
            cursor: "pointer",
          }}
          onClick={logOut}
        >
          Đăng xuất tài khoản
        </span>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={[
            {
              label: <span style={{ color: "white" }}>Thông tin cá nhân</span>,
              key: "1",
              children: (
                <div style={{ color: "white" }} className="information-profile">
                  <div className="information">
                    <span>Hồ sơ</span>
                    <div className="wrapper-box">
                      <div className="left-box">
                        <Image
                          onClick={handleEdit}
                          src={account?.avatar === null ? "" : account?.avatar}
                          alt=""
                          preview={false}
                        ></Image>
                        <div className="middle-box">
                          <span className="username">{account?.username}</span>
                          <div className="middle-bottom-box">
                            <span>Giới tính: chưa cập nhật</span>
                            <span className="line"></span>
                            <span>Sinh nhật: chưa cập nhật</span>
                          </div>
                        </div>
                      </div>
                      <div className="right-box">Thay đổi</div>
                    </div>
                  </div>
                  <div className="account">
                    <span className="title">Tài khoản và bảo mật</span>
                    <div className="wrapper-box-bottom">
                      <div className="accountnumber">
                        <span>Tài khoản</span> <span>02939329</span>
                      </div>
                      <div className="accountnumber">
                        <span>Rank</span>{" "}
                        <span>
                          {account?.voucher
                            ? account?.voucher
                            : "Chưa mua voucher"}
                        </span>
                      </div>
                      <div className="idnumber">
                        <span>ID</span> <span>{account?._id}</span>
                      </div>
                      <div className="email">
                        <div className="email-left">
                          <span>E-mail</span> <span>{account?.email}</span>
                        </div>
                        <div className="change">Thay đổi </div>
                      </div>
                      <div className="location">
                        <div className="location-left">
                          <span>Khu vực</span>
                          <span></span>
                        </div>
                        <div className="change">Thay đổi</div>
                      </div>
                      <div className="password">
                        <div className="password-left">
                          <span>Mật khẩu</span> <span>*******</span>
                        </div>
                        <div className="change">Thay đổi</div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: <span style={{ color: "white" }}>Lịch sử giao dịch</span>,
              key: "2",
              children: (
                <div style={{ color: "white" }}>
                  {" "}
                  <Table
                    pagination={false}
                    dataSource={account?.historyBuy}
                    columns={columnsListJob}
                  />
                </div>
              ),
            },
            {
              label: (
                <span style={{ color: "white" }}>Danh sách phim yêu thích</span>
              ),
              key: "3",
              children: (
                <div style={{ color: "white" }}>
                  {" "}
                  <Table
                    pagination={false}
                    dataSource={account?.favMovie}
                    columns={columnsListJob2}
                  />{" "}
                </div>
              ),
            },
          ]}
        />
      </div>
      <Modal
        className="modal-signin"
        title="Title"
        open={open}
        footer={null}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Button onClick={handleCancel}>Đóng</Button>
        <Button onClick={handleOk}>Đăng xuất</Button>
      </Modal>
      <ModalAvatar
        open={isModalVisible}
        handleCancel={handleCloseModalEdit}
      ></ModalAvatar>
    </Page>
  );
};
export default Profile;
