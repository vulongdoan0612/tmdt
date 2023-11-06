import Header from "@/components/Header";
import ModalEditMovie from "@/components/ModalEditMovie";
import ModalEditMovieAdmin from "@/components/ModalEditMovieAdmin";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { deleteVideoAdmin, getAllFilm } from "@/services/account";
import { getAcc, loginAdmin } from "@/services/admin";

import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Layout, Menu, Pagination, Space, Table, TableProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Admin = () => {
      const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
    const [selectedItemEdit, setSelectedItemEdit] = useState([]);
      const [filmMaker, setFilmMaker] = useState<any>([]);
      const [acc, setAcc] = useState<any>([]);

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState<boolean>(false);
    const [current, setCurrent] = useState(1);    const [currentAcc, setCurrentAcc] = useState(1);

      const { Header, Sider, Content } = Layout;
 const getData = async () => {
   const token = localStorage.getItem("access_token_admin");

   const data = await getAllFilm(String(token));
   setFilmMaker(data);
    };
     const getDataAcc = async () => {
       const token = localStorage.getItem("access_token_admin");

       const data = await getAcc();
       setAcc(data);
     };
    useEffect(() => {
     getDataAcc()
   getData();
 }, []);
       const handleCloseModalEditMovie = () => {
         setIsModalVisibleEdit(false);
       };
  const onChangePage = (page: number) => {
    setCurrent(page);
    };
     const onChangePageAcc = (page: number) => {
       setCurrentAcc(page);
     };
    type FieldType = {
      username?: string;
      password?: string;
      remember?: string;
    };
      const router = useRouter();

      const { account, isAuthenticated, loading } = useSelector(
        (state: RootState) => state.auth
      );
      useEffect(() => {
        if (account?.isAdmin === false) {
          router.push("/");
        }
      }, []);
      const {
        token: { colorBgContainer },
      } = theme.useToken();
  const onFinish = async (values: any) => {
    const refresh_token = localStorage.getItem("refresh_token");
    try {
      const dataLogin = {
        email: values?.email,
        password: values?.password,
      };
      console.log(dataLogin, values);
      const response = await loginAdmin(dataLogin);
      console.log(response);
      if (response.status === 200 && response?.data?.token) {
        try {
          localStorage.setItem("access_token_admin", response?.data?.token);
          localStorage.setItem(
            "refresh_token_admin",
            response?.data?.refreshToken
          );
          localStorage.setItem("role", response?.data?.role);
        } catch {
        } finally {
        }
      } else if (response.status === 401) {
        toast.error("Sai mật khẩu hoặc tài khoản không tồn tại");
      }
    } catch (error: any) {
      toast.error("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    } 
  };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
      const handleEditMovie = (item: any) => {
        try {
          setSelectedItemEdit(item);
        } catch {
          console.log({
            message: "An error has occurred. Please try again later.",
            description: "Error",
          });
        } finally {
          setIsModalVisibleEdit(true);
        }
    };
    const handleDelete = async (item: any) => {
      const token = localStorage.getItem("access_token");

        const data = await deleteVideoAdmin(String(token), { id: item._id });
getData()    };
    const columnsListJob: TableProps<any>["columns"] = [
      {
        title: "Id",
        dataIndex: "_id",
        key: "_id",
        fixed: "left",
      },
      {
        title: "Đạo diễn",
        dataIndex: "author",
        key: "author",
        fixed: "left",
      },
      {
        title: "Tên phim",
        dataIndex: "movieName",
        key: "movieName",
        fixed: "left",
      },
      {
        title: "Ngày ra mắt",
        dataIndex: "dateRelease",
        key: "dateRelease",
      },
      {
        title: "Diễn Viên",
        dataIndex: "actor",
        key: "actor",
      },

      {
        title: "Ảnh poster",
        dataIndex: "thumbnails",
        key: "thumbnails",
        ellipsis: true,
      },
      {
        title: "Link video phim",
        dataIndex: "movies",
        key: "movies",
        ellipsis: true,
      },

      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, record) => (
          <Dropdown
            menu={{
              items: [
                {
                  label: <p onClick={() => handleEditMovie(record)}>Edit</p>,
                  key: "0",
                },
                {
                  type: "divider",
                },
                {
                  label: <p onClick={() => handleDelete(record)}>Delete</p>,
                  key: "1",
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>More</Space>
            </a>
          </Dropdown>
        ),
      },
    ];
     const columnsListAcc: TableProps<any>["columns"] = [
       {
         title: "Id",
         dataIndex: "_id",
         key: "_id",
         fixed: "left",
       },
       {
         title: "Username",
         dataIndex: "username",
         key: "username",
         fixed: "left",
       },
       {
         title: "Email",
         dataIndex: "email",
         key: "email",
         fixed: "left",
       },
       {
         title: "Avatar",
         dataIndex: "avatar",
           key: "avatar",
         ellipsis:true
       },

       {
         title: "Action",
         dataIndex: "action",
         key: "action",
         render: (_, record) => (
           <Dropdown
             menu={{
               items: [
                 {
                   label: <p onClick={() => handleEditMovie(record)}>Edit</p>,
                   key: "0",
                 },
                 {
                   type: "divider",
                 },
                 {
                   label: <p onClick={() => handleDelete(record)}>Delete</p>,
                   key: "1",
                 },
               ],
             }}
             trigger={["click"]}
           >
             <a onClick={(e) => e.preventDefault()}>
               <Space>More</Space>
             </a>
           </Dropdown>
         ),
       },
     ];
    return (
      <div>
        {" "}
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[selectedMenu]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Danh sách phim",
                  onClick: () => setSelectedMenu("1"),
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                  onClick: () => setSelectedMenu("2"),
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "nav 3",
                  onClick: () => setSelectedMenu("3"),
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {selectedMenu === "1" && (
                <div>
                  <Table
                    pagination={false}
                    dataSource={filmMaker.data}
                    columns={columnsListJob}
                  />
                  <Pagination
                    current={current}
                    onChange={onChangePage}
                    total={5}
                  ></Pagination>
                </div>
              )}
              {selectedMenu === "2" && (
                <div>
                  <Table
                    pagination={false}
                    dataSource={acc.data}
                    columns={columnsListAcc}
                  />
                  <Pagination
                    current={currentAcc}
                    onChange={onChangePageAcc}
                    total={5}
                  ></Pagination>
                </div>
              )}
              {selectedMenu === "3" && "nav 3"}{" "}
            </Content>
          </Layout>
        </Layout>
        <ModalEditMovieAdmin
          setFilmMaker={setFilmMaker}
          // getData={getData()}
          open={isModalVisibleEdit}
          handleCancel={handleCloseModalEditMovie}
          selectedItem={selectedItemEdit}
        ></ModalEditMovieAdmin>
      </div>
    );
}
export default Admin