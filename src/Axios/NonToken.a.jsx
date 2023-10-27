import axios from "axios";

const nonTokenAxiosInstance = axios.create({
  // baseURL: "https://shop-demo1.onrender.com/",
  baseURL: "http://localhost:20474/",
});

export default nonTokenAxiosInstance;
