import axios from "axios";
import Cookies from "js-cookie";

const addressAxiosInstance = axios.create({
  baseURL: "https://shop-demo1.onrender.com/address/api/",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default addressAxiosInstance;
