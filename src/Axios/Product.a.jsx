import axios from "axios";
import Cookies from "js-cookie";

const productAxiosInstance = axios.create({
  baseURL: "https://shop-demo1.onrender.com/",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default productAxiosInstance;
