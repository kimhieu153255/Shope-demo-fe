import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import cryptojs from "crypto-js";
import { useDispatch } from "react-redux";
import { login } from "../redux-toolkit/AuthSlice";
import Cookies from "js-cookie";
import nonTokenAxiosInstance from "../Axios/NonToken.a";

const LoginUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(Cookies.get("user")?.toString() || null);

  useEffect(() => {
    user && navigate("/");
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.password = data.password
      ? cryptojs.SHA256(data.password).toString()
      : null;
    try {
      console.log(data);
      const res = await nonTokenAxiosInstance.post("/user/api/login", data);
      console.log(res.data);
      if (res.data) {
        Cookies.set("token", res.data.token, {
          expires: new Date(res.data.expiresAt),
        });
        Cookies.set("user", JSON.stringify(res.data.user), {
          expires: new Date(res.data.expiresAt),
        });
        Cookies.set("storeId", res.data.storeId, {
          expires: new Date(res.data.expiresAt),
        });
        dispatch(login(res.data));
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={() => navigate("/")}
        className="absolute translate-x-0 -translate-y-1 right-5 top-5 bg-green-400 p-2 rounded-full hover:bg-green-500 transition-all text-white"
      >
        <FaArrowLeft />
      </button>
      <div className="sm:w-2/6 w-3/5 mx-auto bg-gray-100 shadow-md sm:p-16 p-10 border rounded-md">
        <form className="flex flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-3xl mb-5">Login</h1>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-semibold">{error}</div>
          )}
          <div className="flex flex-col pt-10">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 text-md font-semibold transition-all"
            >
              Login
            </button>
          </div>
          {/* path to Register */}
          <div className="flex flex-col">
            <button
              onClick={() => navigate("/user/register")}
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 text-md font-semibold transition-all"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
