import axios from "axios";

const nonTokenAxiosInstance = axios.create({
  baseURL: "https://shop-demo1.onrender.com/",
});

export default nonTokenAxiosInstance;
