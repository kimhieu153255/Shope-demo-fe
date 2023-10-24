import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../helpers/helper.js";
import nonTokenAxiosInstance from "../Axios/NonToken.a.jsx";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      setError("Please fill all the fields");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("Password does not match");
      return;
    }
    if (!validatePassword(data.password)) {
      setError(
        "Password must contain at least 1 uppercase, 1 lowercase letter and 1 number"
      );
      return;
    }
    data.password = data.password
      ? CryptoJS.SHA256(data.password).toString()
      : null;
    data.confirmPassword = data.confirmPassword
      ? CryptoJS.SHA256(data.confirmPassword).toString()
      : null;
    console.log(data);
    if (!validateEmail(data.email)) {
      setError("Invalid email");
      return;
    }
    if (!validatePhone(data.phone)) {
      setError("Invalid phone number");
      return;
    }
    try {
      const res = await nonTokenAxiosInstance.post("/user/api/register", data);
      if (res.data) {
        navigate("/user/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center items-center my-3 flex-wrap">
      <button
        onClick={() => navigate("/")}
        className="absolute translate-x-0 -translate-y-1 right-5 top-5 bg-green-400 p-2 rounded-full hover:bg-green-500 transition-all text-white"
      >
        <FaArrowLeft />
      </button>
      <div className="sm:w-2/6 w-3/5 mx-auto bg-gray-100 shadow-md sm:p-16 p-10 border rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5 mx-auto">
            <h1 className="text-center font-bold text-3xl mb-5">Register</h1>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
                required
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
                required
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="confirmPassword" className="font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
                required
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="phone" className="font-semibold">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
                required
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm font-semibold">{error}</div>
            )}
            <div className="flex flex-col pt-5">
              <button
                type="submit"
                className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 text-md font-semibold transition-all"
              >
                Register
              </button>
            </div>
            <div className="flex flex-col">
              <button
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 text-md font-semibold transition-all"
                onClick={() => navigate("/user/login")}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
