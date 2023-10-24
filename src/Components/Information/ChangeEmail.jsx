import { useState } from "react";
import { validateEmail } from "../../helpers/helper";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tokenAxiosInstance from "../../Axios/Token.a";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const [data, setData] = useState({
    id: user._id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newEmail, confirmNewEmail } = data;
    if (!newEmail || !confirmNewEmail) {
      setErr("Please fill all the fields");
      return;
    }
    if (newEmail !== confirmNewEmail) {
      setErr("Email does not match");
      return;
    }
    if (!validateEmail(newEmail)) {
      setErr("Invalid email");
      return;
    }
    console.log(data);
    try {
      const res = await tokenAxiosInstance.post("/user/api/verify/email", data);
      if (res.data) {
        console.log(res.data);
        navigate(`/user/information/verify-email/${data?.newEmail}`);
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="w-1/2 mx-auto bg-gray-100 p-5 border rounded-lg shadow-md min-w-max">
      <div className="font-bold text-lg text-center mb-3">changeEmail</div>
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="inline-block w-40  font-semibold p-1.5">
            New Email:
          </label>
          <input
            type="email"
            name="newEmail"
            id="newEmail"
            className="p-1.5 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            onChange={(e) => setData({ ...data, newEmail: e.target.value })}
          />
        </div>
        <div>
          <label className="inline-block w-40  font-semibold p-1.5">
            Confirm New Email:
          </label>
          <input
            type="email"
            name="confirmNewEmail"
            id="confirmNewEmail"
            className="p-1.5 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            onChange={(e) =>
              setData({ ...data, confirmNewEmail: e.target.value })
            }
          />
        </div>
        {err && (
          <div className="px-1.5 w-full text-center text-red-500 font-semibold">
            {err}
          </div>
        )}
        <div className="px-1.5 w-40">
          <button
            type="submit"
            className="w-full bg-green-500 p-1.5 rounded-md border border-green-500 text-white  hover:bg-green-600 transition-all"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmail;
