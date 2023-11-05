import ModalAddMovie from "@/components/ModalAddMovie";
import { PAGE_TITLE } from "@/constants";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import { deleteFilmMaker, getAllFilmMaker } from "@/services/movie";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  TableProps,
  Space,
  Table,
  Pagination,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CMS = () => {
  const { Header, Sider, Content } = Layout;
  const [isModalVisiblePlan, setIsModalVisiblePlan] = useState<boolean>(false);
  const [selectedItemPlan, setSelectedItemPlan] = useState([]);

  const router = useRouter();
  const { account, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(account);
  useEffect(() => {
    if (account?.isMaker === false) {
      router.push("/");
    }
  }, []);
  const [current, setCurrent] = useState(1);
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState("1");
  const handleCloseModalAddMovie = () => {
    setIsModalVisiblePlan(false);
  };
  const [filmMaker,setFilmMaker]=useState<any>([])
  const getData=async()=>{
    const token = localStorage.getItem("access_token");

    const data =await getAllFilmMaker(String(token))
    setFilmMaker(data)
  }
  useEffect(()=>{
    getData()
  },[])
  const handleAddMovie = () => {
    try {
      setSelectedItemPlan(account);
    } catch {
      console.log({
        message: "An error has occurred. Please try again later.",
        description: "Error",
      });
    } finally {
      setIsModalVisiblePlan(true);
    }
  };
  const handleDelete =async(item:any)=>{
    const token = localStorage.getItem("access_token");

      const data = await deleteFilmMaker(token,{id:item._id})
      getData()
    console.log(data)
  }
  const columnsListJob: TableProps<any>["columns"] = [
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
                label: <p>Edit</p>,
                key: "0",
              },
              {
                type: "divider",
              },
              {
                label: <p onClick={()=>handleDelete(record)}>Delete</p>,
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
                label: "Phim của tôi",
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
                <Button onClick={handleAddMovie}>ADD MOVIE</Button>
                <Table
                  pagination={false}
                  dataSource={filmMaker?.data}
                  columns={columnsListJob}
                />
                  <Pagination
                              current={current}
                              onChange={onChangePage}
                              total={filmMaker?.data?.length}
                            ></Pagination>
              </div>
            )}
            {selectedMenu === "2" && "Content 2"}
            {selectedMenu === "3" && "nav 3"}{" "}
          </Content>
        </Layout>
      </Layout>
      <ModalAddMovie
        open={isModalVisiblePlan}
        handleCancel={handleCloseModalAddMovie}
        selectedItem={selectedItemPlan}
      ></ModalAddMovie>
    </Page>
  );
};
export default CMS;
