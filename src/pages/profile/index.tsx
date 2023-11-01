import ModalAvatar from "@/components/ModalAvatar";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { Image, Tabs } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { account, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCloseModalEdit = () => {
    setIsModalVisible(false);
  };
  const handleEdit = () => {
    setIsModalVisible(true);
  };
  console.log(account)
  return (
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="profile-page-wrapper">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={[
            {
              label: <span style={{ color: "white" }}>Thông tin cá nhân</span>,
              key: "1",
              children: <div style={{ color: "white" }}>Content of tab 1</div>,
            },
            {
              label: <span style={{ color: "white" }}>Lịch sử giao dịch</span>,
              key: "2",
              children: (
                <div style={{ color: "white" }} className="information-profile">
                  <div className="information">
                    <span>Hồ sơ</span>
                    <div className="wrapper-box">
                      <div className="left-box">
                          <Image
                            onClick={handleEdit}
                            src={account?.avatar === null ? '' : account?.avatar}
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
                      <div className="idnumber">
                        <span>ID</span> <span>{account?._id}</span>
                      </div>
                      <div className="email">
                        <div className="email-left">
                          <span>E-mail</span>{" "}
                          <span>{account?.email}</span>
                        </div>
                        <div className="change">Thay đổi</div>
                      </div>
                      <div className="location">
                        <div className="location-left">
                          <span>Khu vực</span> <span>Chưa cập nhật</span>
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
          ]}
        />
      </div>
      <ModalAvatar
        open={isModalVisible}
        handleCancel={handleCloseModalEdit}
      ></ModalAvatar>
    </Page>
  );
};
export default Profile;
