import axios from "axios";
import Cookies from "js-cookie";

const imageAxiosInstance = axios.create({
  baseURL: "https://shop-demo1.onrender.com/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export default imageAxiosInstance;
