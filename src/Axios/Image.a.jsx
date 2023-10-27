import axios from "axios";
import Cookies from "js-cookie";

const imageAxiosInstance = axios.create({
  // baseURL: "https://shop-demo1.onrender.com/",
  baseURL: "http://localhost:20474/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export default imageAxiosInstance;
