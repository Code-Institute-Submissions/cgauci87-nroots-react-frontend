import axios from "axios";

// let baseUrl = "https://8000-cgauci87-mycodrfapi-0c7dgbgbron.ws-eu84.gitpod.io/";
let baseUrl = "https://myco-malta.herokuapp.com/";
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export const axiosReq = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const axiosRes = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const jsonAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: { "content-type": "application/json" },
});

export const authAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authPrivateAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const authAxios = axios.create({
//   baseURL: baseUrl,
//   headers: { "content-type": "application/json" },
// });

// authAxios.interceptors.request.use((config) => {
//   let accessToken = localStorage.getItem("access_token");
//   config.headers.Authorization = `Bearer ${accessToken}`;
//   return config;
// });
