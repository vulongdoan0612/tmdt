import { axios } from "@/utils/axios";

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
  export const getAllFilmMaker = async (accessToken: string) => {
    const config = {
      method: "GET",
      url: `/movies-of-filmMaker`,
      headers: {
        'Authorization': accessToken
      },
    };
  
    return axios(config);
  };
  export const getFilm = async (id:any) => {
    const config = {
      method: "POST",
      url: `/detail-movie`,
      data: id,

    };
  
    return axios(config);
  };  export const deleteFilmMaker = async (accessToken:any,id:any) => {
    const config = {
      method: "DELETE",
      url: `/delete-video`,
      data: id,
      headers: {
        'Authorization': accessToken
      },
    };
  
    return axios(config);
};
export const updateCensorship = async (idMovie: any,censorship:any) => {
  const values ={idMovie,censorship}
  console.log(values);
  const config = {
    method: "POST",
    url: `/update-movie-censorship`,
    data: values,
  };

  return axios(config);
};