import axios from "axios";

let baseUrl = "https://8000-cgauci87-nrootsdrfapi-j8v838srezm.ws-eu84.gitpod.io/"; // Development
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
