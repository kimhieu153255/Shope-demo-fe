import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";
import tokenAxiosInstance from "../../Axios/Token.a";

const VerifyPhone = () => {
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await tokenAxiosInstance.post(
        `/user/api/verify/phone/confirm?userId=${user._id}`,
        { numberCode: code }
      );
      if (res.data) {
        console.log(res.data);
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 1 / 24 });
        Cookies.set("token", JSON.stringify(res.data.token), {
          expires: 1 / 24,
        });
        navigate("/user/information/resume");
        dispatch(addMessage("Verify Phone Successfully"));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 3000);
      } else {
        setErr(res.data);
      }
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  return (
    <div className="px-8 py-10 flex flex-col gap-3 justify-center items-center border rounded-md bg-gray-100 w-2/5 min-w-max mx-auto">
      <h1 className="font-bold text-xl">Verify Phone</h1>
      <div className="text-center">
        <div>
          <span className="font-semibold text-lg">Code: </span>
          <input
            type="text"
            maxLength={6}
            className="shadow appearance-none rounded w-52 text-4xl py-2 text-center leading-tight focus:outline-none focus:shadow-outline tracking-[10px]"
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        {err && <p className="text-red-500">{err}</p>}
        <button
          className="bg-green-500 p-2 font-semibold text-lg rounded-lg mt-3 w-20 min-w-fit"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyPhone;
