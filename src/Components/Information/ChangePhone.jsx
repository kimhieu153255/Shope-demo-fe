import { useState } from "react";
import { validatePhone } from "../../helpers/helper";
import Cookies from "js-cookie";
import tokenAxiosInstance from "../../Axios/Token.a";

const ChangePhone = () => {
  const [newPhone, setNewPhone] = useState("");
  const [errorNewPhone, setErrorNewPhone] = useState("");
  const [errorConfirmNewPhone, setErrorConfirmNewPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await tokenAxiosInstance.post("/user/api/verify/phone", {
        newPhone,
        userId: JSON.parse(Cookies.get("user")?.toString() || null)._id,
      });
      if (res.data) {
        console.log(res.data);
      }
      window.location.href = `/user/information/verify-phone`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center bg-gray-100 border rounded-md mx-auto h-full">
      <h2 className="font-bold text-2xl text-center mb-5">
        Change Phone Number
      </h2>
      <form
        className="flex flex-col justify-center w-2/3 mx-auto gap-5 text-lg my-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="newPhone" className="font-semibold text-lg">
            New Phone Number
          </label>
          <input
            type="text"
            id="newPhone"
            name="newPhone"
            placeholder="New Phone Number"
            className="px-3 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
            onChange={(e) => setNewPhone(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrorNewPhone("Phone number is required");
                return;
              }
              if (!validatePhone(e.target.value))
                setErrorNewPhone("Invalid phone number");
              else setErrorNewPhone("");
            }}
          ></input>
          {errorNewPhone && (
            <div className="text-red-500 font-semibold">{errorNewPhone}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmNewPhone" className="font-semibold text-lg">
            Confirm New Phone Number
          </label>
          <input
            type="text"
            id="confirmNewPhone"
            name="confirmNewPhone"
            placeholder="Confirm New Phone Number"
            className="px-3 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
            required
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrorConfirmNewPhone("Phone number is required");
                return;
              }
              if (e.target.value !== newPhone)
                setErrorConfirmNewPhone("Confirm phone number does not match");
              else setErrorConfirmNewPhone("");
            }}
          ></input>
          {errorConfirmNewPhone && (
            <div className="text-red-500 font-semibold">
              {errorConfirmNewPhone}
            </div>
          )}
        </div>
        <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all">
          Change
        </button>
      </form>
    </div>
  );
};

export default ChangePhone;
