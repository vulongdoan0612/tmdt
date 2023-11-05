import { IForgotPassword, ILogin, IRegister, IResetPassword } from "@/interfaces/request/account";
import { setAuthenticate } from "@/redux/reducers/auth";
import { axios } from "@/utils/axios";

export const requestLogin = async (data: ILogin) => {
    console.log(data)
  const config = {
    method: "POST",
    url: `/login`,
    data: data,
  };

  return axios(config);
};
export const requestLoginFilmMaker = async (data: ILogin) => {
  console.log(data)
const config = {
  method: "POST",
  url: `/login-filmMaker`,
  data: data,
};

return axios(config);
};
export const requestRegister = async (data: IRegister) => {
    const config = {
      method: "POST",
      url: `/register`,
      data: data,
    };
  
    return axios(config);
};
  export const requestRegisterFilmMaker = async (data: IRegister) => {
    const config = {
      method: "POST",
      url: `/register-filmMaker`,
      data: data,
    };

    return axios(config);
  };
  export const requestForgotPassword = async (data: IForgotPassword) => {
    console.log(data)
    const config = {
      method: "POST",
      url: `/forgot-password`,
      data: data,
    };
  
    return axios(config);
  };
  export const requestResetPassword = async (data: IResetPassword) => {
    
    const config = {
      method: "POST",
      url: `/reset-password`,
      data: data,
    };
  
    return axios(config);
};
  export const getProfile = async (
    accessToken: string,
    refresh_token: string
  ) => {
    console.log(accessToken)
    const config = {
      method: "GET",
      url: `profile`,
      headers: {
        Authorization: accessToken,
      },
    };

    try {
      const response = await axios(config);
      return response.data; // Trả về dữ liệu từ API
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        try {
          console.log("Token đã hết hạn ");
          await requestNewAccessToken(String(refresh_token));
        } catch (error) {
          console.log(error);
        }
      } else {
        throw error; // Ném lỗi nếu có lỗi khác xảy ra
      }
    }
  };
  export const getProfileFilmMaker = async (
    accessToken: string,
    refresh_token: string
  ) => {
    console.log(accessToken)
    const config = {
      method: "GET",
      url: `profile-filmMaker`,
      headers: {
        Authorization: accessToken,
      },
    };

    try {
      const response = await axios(config);
      return response.data; // Trả về dữ liệu từ API
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        try {
          console.log("Token đã hết hạn ");
          await requestNewAccessToken(String(refresh_token));
        } catch (error) {
          console.log(error);
        }
      } else {
        throw error; // Ném lỗi nếu có lỗi khác xảy ra
      }
    }
  };
export const requestNewAccessToken = async (refreshToken: string) => {
  try {
    const config = {
      method: "POST",
      url: `/refresh-token`,
      data: {
        refreshToken: refreshToken,
      },
    };

    const response = await axios(config);
    if (response.status === 200) {
      const data = response.data;
      const newAccessToken = data.accessToken;
      // Lưu trữ token mới và cập nhật state
      localStorage.setItem("access_token", newAccessToken);
    } else {
      // Xử lý lỗi, ví dụ: đăng xuất người dùng
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật token:", error);
  }
};
export const changeProfile = async (data: any, accessToken: string | null) => {
  const formData = new FormData();
  console.log(data)
  if (data.avatar && data.avatar.length > 0) {
    formData.append('avatar', data.avatar[0].originFileObj);
  }
  const config = {
    method: "PUT",
    url: `/change-profile`,
    data: data.avatar && data.avatar.length ? formData : data,
    headers: {
      'Content-Type': 'multipart/form-data',

      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const uploadMovie = async (movie: any, thumbnail:any,accessToken: string | null,info:any) => {
  const formData = new FormData();
  if (movie.movies) {
    formData.append('movies', movie?.movies[0]?.originFileObj);
  }
  console.log(thumbnail,movie)
  if (thumbnail.thumbnails) {
    formData.append('thumbnails', thumbnail?.thumbnails[0]?.originFileObj);
  }
  if(info){
    formData.append('author', info.author);
    formData.append('movieName', info.movieName);
    formData.append('dateRelease', info.dateRelease);
    formData.append('actor', info.actor);

  }
  console.log(formData)
  const config = {
    method: "POST",
    url: `/upload-video`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',

      'Authorization': accessToken
    },
  };

  return axios(config);
};
export const logout = (dispatch: any) => {
  // Xóa AccessToken và RefreshToken từ Local Storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");

  // Gửi dispatch để cập nhật trạng thái đăng nhập
  dispatch(
    setAuthenticate({ isAuthenticated: false, account: {}, loading: false })
  );
};
export const getAllFilm = async (accessToken: string) => {
  const config = {
    method: "GET",
    url: `/all-movies`,
    headers: {
      'Authorization': accessToken
    },
  };

  return axios(config);
};