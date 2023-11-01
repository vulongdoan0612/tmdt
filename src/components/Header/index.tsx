import { getProfile, requestForgotPassword, requestLogin, requestRegister } from "@/services/account";
import { Button, Checkbox, Form, Image, Input, Modal } from "antd";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticate } from "@/redux/reducers/auth";
import { AxiosResponse } from "axios";
import useDidMountEffect from "@/utils/customHook";
import { RootState } from "@/redux/store";
import { limitText } from "@/utils/limitText";
import { useRouter } from "next/router";
interface LoginForm{
  email: string;
  password: string;
}
const Header = () => {
  const dispatch = useDispatch();
   const token = localStorage.getItem("access_token");
  const router = useRouter();

useDidMountEffect(() => {
  fetchData();
}, [token]);
    const { account, isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openForgotpassword, setOpenForgotpassword] = useState(false);
  const [confirmLoadingForgotpassword, setConfirmLoadingForgotpassword] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [confirmLoadingSignup, setConfirmLoadingSignup] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleProfile = () => {
    router.push("/profile");
  }
  const handleOk = () => {
    setConfirmLoading(true);
   
  };
  const handleOkForgotpassword = () => {
    setConfirmLoadingForgotpassword(true);
   
  };
  const handleOkSignup = () => {
    setConfirmLoadingSignup(true);
   
  };
  const forgotPass =()=>{
    setOpen(false)
    setOpenForgotpassword(true)
  }
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinishForgotpassword  =()=>{

  }
  const handleCancelForgotpassword = () => {
    console.log("Clicked cancel button");
    setOpenForgotpassword(false);
  };
  const handleCancelSignup = () => {
    console.log("Clicked cancel button");
    setOpenSignup(false);
  };
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
         console.log(response);
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
  const onFinish = async (values: LoginForm) => {
      const refresh_token = localStorage.getItem("refresh_token");
    setConfirmLoading(true);
    try {
      const dataLogin = {
        email: values?.email,
        password: values?.password,
      };
      console.log(dataLogin,values)
      const response = await requestLogin(dataLogin);
      console.log(response);
      if (response.status === 200 && response?.data?.token) {
        try {
          localStorage.setItem("access_token", response?.data?.token);
          localStorage.setItem("refresh_token", response?.data?.refreshToken);
          localStorage.setItem("role", response?.data?.role);
        } catch {
        }
        finally {
          // const response = await getProfile(
          //   String(token),
          //   String(refresh_token)
          // );
          // console.log(response);
          // if (response?.user) {
          //   dispatch(
          //     setAuthenticate({
          //       isAuthenticated: true,
          //       account: response?.user,
          //       loading: false,
          //     })
          //   );
          // }
        }
      } else if (response.status === 401) {
        toast.error("Sai mật khẩu hoặc tài khoản không tồn tại");
      }
    } catch (error: any) {
      toast.error("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    }
    finally{
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 500);
    }
  };
  const onFinishSignup = async (values: any) => {
    try {
      const dataLogin = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      const response = await requestRegister(dataLogin);
      if (
        response.status === 201 &&
        response?.data?.message === "User registered successfully."
      ) {
        setOpenSignup(false)
        toast.success(response.data.message);

      } else if (response.status === 400) {
        toast.error("Email đã tồn tại.");
      }
    } catch (error: any) {
      toast.error("Email đã tồn tại");
    }
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  const handleSignUp =()=>{
    setOpen(false)
    setOpenSignup(true)
  }
  const onFinishGetCode = async (values: any) => {
    console.log(values)
    try {
      const dataReset = {
        email: values.email,
      };
      const response = await requestForgotPassword(dataReset);
      if (response.status === 200) {
        toast.success("OTP send to your email.")
      } else {
        console.log("Sai mật khẩu hoặc tài khoản không tồn tại");
      }
    } catch (error: any) {
      console.log("Sai mật khẩu hoặc tài khoản không tồn tại", error);
    }
  };
  return (
    <div className="header-wrapper">
      <div className="header-left">
        <a href="/"><Image src="/icons/logo.png" preview={false} alt=""></Image></a>
        <div className="list-menu">
          <span>Trang chủ</span>
          <span>Truyền hình</span>
          <span>Phim bộ</span>
          <span>Thể thao</span>
          <span>Thiếu nhi</span>
        </div>
      </div>
      <div className="header-right">
        <Image src="/icons/search.png" preview={false} alt=""></Image>
        <Image src="/icons/icon-alarm.png" preview={false} alt=""></Image>

        <button>
          {" "}
          <Image src="/icons/Wallet.png" preview={false} alt=""></Image>
          <span>Mua giói</span>
        </button>
        {account?.username ? (
          <span className="username" onClick={handleProfile}>{limitText(account.username)}</span>
        ) : (
          <span className="login" onClick={showModal}>
            Đăng nhập
          </span>
        )}
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
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          // initialValues={{
          //   remember: true,
          // }}

          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <span onClick={forgotPass}>Quên mật khẩu</span>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <span className="signup" onClick={handleSignUp}>
          Chưa có tài khoản? Đăng ký miễn phí
        </span>
      </Modal>
      <Modal
        className="modal-signin"
        title="Title"
        open={openSignup}
        footer={null}
        onOk={handleOkSignup}
        confirmLoading={confirmLoadingSignup}
        onCancel={handleCancelSignup}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinishSignup}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        className="modal-signin"
        title="Quên mật khẩu"
        open={openForgotpassword}
        footer={null}
        onOk={handleOkForgotpassword}
        confirmLoading={confirmLoadingForgotpassword}
        onCancel={handleCancelForgotpassword}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          // initialValues={{
          //   remember: true,
          // }}

          onFinish={onFinishForgotpassword}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <Input style={{ flex: "4" }} placeholder="Email" />
              <Button style={{ flex: "1" }} onClick={(e) => onFinishGetCode(e)}>
                Send OTP
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đặt lại tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Header;
