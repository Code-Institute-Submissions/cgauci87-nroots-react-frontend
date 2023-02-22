import axios from "axios";

// let baseUrl = "https://nroots-drf-api.herokuapp.com/"; // DRF API PRODUCTION
let baseUrl = "https://8080-cgauci87-nrootsdrfapi-6m4oduklif1.ws-eu87.gitpod.io/";
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export const axiosReq = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "content-type": "multipart/form-data", // content-type need to be multipart/form-data if the content include an image
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
