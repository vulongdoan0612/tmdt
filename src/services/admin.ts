import { axios } from "@/utils/axios";

export const loginAdmin = async (data: any) => {
  console.log(data);
  const config = {
    method: "POST",
    url: `/login-admin`,
    data: data,
  };

  return axios(config);
};
export const postComment= async (data: any) => {
  const config = {
    method: "POST",
    url: `/post-comment`,
    data: data,
  };

  return axios(config);
};
export const postStar = async (data: any) => {
  const config = {
    method: "POST",
    url: `/post-star`,
    data: data,
  };

  return axios(config);
};
export const addFav = async (data: any) => {
  const config = {
    method: "POST",
    url: `/add-fav`,
    data: data,
  };

  return axios(config);
};
export const delFav = async (data: any) => {
  const config = {
    method: "DELETE",
    url: `/remove-fav`,
    data: data,
  };

  return axios(config);
};
export const getStar = async (data:any) => {
  const config = {
    method: "POST",
    url: `/get-star`,
    data:data
  };

  return axios(config);
};
export const getAcc = async () => {
  const config = {
    method: "GET",
    url: `/all-acc`,
  };

  return axios(config);
};
export const getComment = async (data: any) => {
  console.log(data)
  const config = {
    method: "POST",
    url: `/get-comment`,
    data:data
  };

  return axios(config);
};
export const editMovieAdmin = async (
  movie: any,
  thumbnail: any,
  accessToken: string | null,
  info: any,
  id: string
) => {
  const formData = new FormData();
  if (movie.movies) {
    formData.append("movies", movie?.movies[0]?.originFileObj);
  }
  if (thumbnail.thumbnails) {
    formData.append("thumbnails", thumbnail?.thumbnails[0]?.originFileObj);
  }
  if (info) {
    formData.append("category", info.category);

    formData.append("author", info.author);
    formData.append("movieName", info.movieName);
    formData.append("dateRelease", info.dateRelease);
    formData.append("actor", info.actor);
    formData.append("id", id);
  }

  const config = {
    method: "PUT",
    url: `/update-video-admin`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",

      Authorization: accessToken,
    },
  };

  return axios(config);
};