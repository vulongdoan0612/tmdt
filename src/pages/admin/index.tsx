import Header from "@/components/Header";
import ModalAddVoucher from "@/components/ModalAddVoucher";
import ModalCensorShip from "@/components/ModalCensorShip";
import ModalEditMovie from "@/components/ModalEditMovie";
import ModalEditMovieAdmin from "@/components/ModalEditMovieAdmin";
import ModalEditVoucher from "@/components/ModalEditVoucher";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import {
  deleteVideoAdmin,
  getAllFilm,
  getAllVoucher,
} from "@/services/account";
import { getAcc, loginAdmin } from "@/services/admin";
import { updateCensorship } from "@/services/movie";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Pagination,
  Space,
  Table,
  TableProps,
  theme,
} from "antd";
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
    const [selectedItemCensor, setSelectedItemCensor] = useState([]);

    const [selectedItemVoucher, setSelectedItemVoucher] = useState([]);
  const [filmMakerAll, setFilmMakerAll] = useState<any>([]);

  const [filmMaker, setFilmMaker] = useState<any>([]);
  const [acc, setAcc] = useState<any>([]);
  const [listVoucher, setListVoucher] = useState<any>([]);
  const [modal,setModal]=useState(false)
  const [isModalVisibleVoucher, setIsModalVisibleVoucher] =
    useState<boolean>(false);

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState<boolean>(false);
    const [isModalVisibleEditVoucher, setIsModalVisibleEditVoucher] =
      useState<boolean>(false);

  const [current, setCurrent] = useState(1);
  const [currentAcc, setCurrentAcc] = useState(1);

  const { Header, Sider, Content } = Layout;
  const getData = async () => {
    const token = localStorage.getItem("access_token_admin");

    const data = await getAllFilm(String(token),{censorship:"true"});
    setFilmMaker(data);
  };
    const getDataAll = async () => {
      const token = localStorage.getItem("access_token_admin");

      const data = await getAllFilm(String(token), {});
      console.log(data);
      setFilmMakerAll(data);
    };
  const getDataAcc = async () => {
    const token = localStorage.getItem("access_token_admin");

    const data = await getAcc();
    setAcc(data);
  };
  const getListVoucher = async () => {
    const data = await getAllVoucher();
    setListVoucher(data);
  };
  useEffect(() => {
    getDataAcc();
    getDataAll();
    getListVoucher();
    getData();
  }, []);
  const handleCloseModalEditMovie = () => {
    setIsModalVisibleEdit(false);
  };
    const handleCloseModalCensor = () => {
      setModal(false);
    };
  const handleCloseModalVoucher = () => {
    setIsModalVisibleVoucher(false);
  };
    const handleCloseModalVoucherEdit = () => {
      setIsModalVisibleEditVoucher(false);
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

  const handleOpenModal = () => {
    setIsModalVisibleVoucher(true);
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
  const handleEditVoucher = (item: any) => {
    try {
          console.log(item);
          setSelectedItemVoucher(item);
        } catch {
          
          console.log({
            message: "An error has occurred. Please try again later.",
            description: "Error",
          });
        } finally {
          setIsModalVisibleEditVoucher(true);
        }
  }
  const handleDelete = async (item: any) => {
    const token = localStorage.getItem("access_token");

    const data = await deleteVideoAdmin(String(token), { id: item._id });
    getData();
  };
    const handleDeleteVoucher = async (item: any) => {
      const token = localStorage.getItem("access_token");

      const data = await deleteVideoAdmin(String(token), { id: item._id });
      getAllVoucher();
  };
  const handleCensor =  (item: any) => {
    try {
      
      setSelectedItemCensor(item);
    }
    catch {
      
    }
    finally {
      setModal(true)
      
    }
    // await updateCensorship({idMovie:})
  }
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
    const columnsListJobAll: TableProps<any>["columns"] = [
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
        title: "Trạng thái phim",
        dataIndex: "censorship",
        key: "censorship",
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
                  label: <p onClick={() => handleDelete(record)}>Delete</p>,
                  key: "1",
                },
                {
                  label: <p onClick={() => handleCensor(record)}>Censorship</p>,
                  key: "2",
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
   const columnsListVoucher: TableProps<any>["columns"] = [
     {
       title: "Id",
       dataIndex: "_id",
       key: "_id",
       fixed: "left",
     },
     {
       title: "Tên Voucher",
       dataIndex: "voucher",
       key: "voucher",
       fixed: "left",
     },
     {
       title: "Thông tin",
       dataIndex: "detail",
       key: "detail",
       fixed: "left",
       render: (text, record) => (
         <ul>
           {Array.isArray(text)
             ? text.map((item, index) => <li key={index}>{item}</li>)
             : Object.entries(text).map(([key, value]) => (
                 <li key={key}>
                   {key}: {value as string}
                 </li>
               ))}
         </ul>
       ),
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
                 label: <p onClick={() => handleEditVoucher(record)}>Edit</p>,
                 key: "0",
               },
               {
                 type: "divider",
               },
               {
                 label: (
                   <p onClick={() => handleDeleteVoucher(record)}>Delete</p>
                 ),
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
    <Page title={PAGE_TITLE.PROFILE} loadingData={false}>
      <div className="admin-page">
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
                  label: "Danh sách phim đã duyệt",
                  onClick: () => setSelectedMenu("1"),
                },
                {
                  key: "2",
                  icon: <UserOutlined />,
                  label: "Tất cả phim ",
                  onClick: () => setSelectedMenu("2"),
                },
                {
                  key: "3",
                  icon: <VideoCameraOutlined />,
                  label: "Danh sách tài khoản",
                  onClick: () => setSelectedMenu("3"),
                },
                {
                  key: "4",
                  icon: <UploadOutlined />,
                  label: "Danh sách Voucher",
                  onClick: () => setSelectedMenu("4"),
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
                    dataSource={filmMakerAll.data}
                    columns={columnsListJobAll}
                  />
                  <Pagination
                    current={current}
                    onChange={onChangePage}
                    total={5}
                  ></Pagination>
                </div>
              )}
              {selectedMenu === "3" && (
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
              {selectedMenu === "4" && (
                <div>
                  <Button onClick={handleOpenModal}>Add Voucher</Button>
                  <Table
                    pagination={false}
                    dataSource={listVoucher.data}
                    columns={columnsListVoucher}
                  />
                  {/* <Pagination
                      current={current}
                      onChange={onChangePage}
                      total={5}
                    ></Pagination> */}
                </div>
              )}{" "}
            </Content>
          </Layout>
        </Layout>
        <ModalCensorShip
          setFilmMaker={setFilmMaker}
          setFilmMakerAll={setFilmMakerAll}
          // getData={getDataAll()}
          selectItem={selectedItemCensor}
          open={modal}
          handleCancel={handleCloseModalCensor}
        ></ModalCensorShip>
        <ModalEditMovieAdmin
          setFilmMaker={setFilmMaker}
          // getData={getData()}
          open={isModalVisibleEdit}
          handleCancel={handleCloseModalEditMovie}
          selectedItem={selectedItemEdit}
        ></ModalEditMovieAdmin>
        <ModalAddVoucher
          // getData={getData()}
          open={isModalVisibleVoucher}
          handleCancel={handleCloseModalVoucher}
        ></ModalAddVoucher>
        <ModalEditVoucher
          selectedItemVoucher={selectedItemVoucher}
          // getData={getData()}
          getListVoucher={getListVoucher}
          open={isModalVisibleEditVoucher}
          handleCancel={handleCloseModalVoucherEdit}
        ></ModalEditVoucher>
      </div>
    </Page>
  );
};
export default Admin;
