import axios from "axios";
import { toast } from "react-toastify";

const errorHandler = (error) => {
  if (error.response.status === 500) {
    toast.error(`${error.response.data.detail}`);
  }
  else if (error.response.status === 401) {
    toast.error("Email or Password is incorrect!");
  }
  else return Promise.reject({ ...error });
};

// axios instance for making requests

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// response interceptor for handling common errors (e.g. HTTP 500)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => errorHandler(error)
);

export default axiosInstance;
