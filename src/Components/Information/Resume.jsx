import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChangeGenderToNumber, changeDateToString } from "../../helpers/helper";
const genderList = ["Other", "Male", "Female"];
import { FaX } from "react-icons/fa6";
import tokenAxiosInstance from "../../Axios/Token.a";

const Resume = () => {
  const overlayRef = useRef();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const [tempImage, setTempImage] = useState(user?.avatar || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.gender) data.gender = ChangeGenderToNumber(data.gender);
    console.log(data);
    try {
      if (data.avatar) {
        const img = await handleUploadImg();
        console.log(img);
        if (img) {
          data.avatar = img;
        }
      }
      console.log(data);
      const res = await tokenAxiosInstance.post(
        `/user/api/update/${user._id}`,
        data
      );
      if (res.data) {
        Cookies.set("token", res.data.token, { expires: 1 / 24 });
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 1 / 24 });
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setTempImage(URL.createObjectURL(file));
    setData({ ...data, avatar: file });
  };

  const handleUploadImg = async () => {
    try {
      const res = await tokenAxiosInstance.post(
        `/user/api/uploadImg`,
        { image: data?.avatar },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data) {
        console.log(res.data);
        return res.data.data;
      }
      return null;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  return (
    <div className="flex flex-col min-w-max p-2 shadow-md bg-gray-50 border rounded-lg h-full">
      <div className="border-b-2 border-gray-300 ml-3">
        <h2 className=" font-bold text-2xl">Résumé</h2>
        <div className="text-lg">
          Manager your résumé to protect your account
        </div>
      </div>
      {user && (
        <form className="m-5 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex flex-col gap-3 min-w-max  pl-5 w-full">
              <div className="p-1.5">
                <div className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right">
                  Username:
                </div>
                <span>{user?.username || "username"}</span>
              </div>
              <div className="p-1.5">
                <span className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right">
                  Name:
                </span>
                <input
                  type="text"
                  name="name"
                  className="border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent p-1.5"
                  defaultValue={user?.name || ""}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                ></input>
              </div>
              <div className="p-1.5">
                <span className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right">
                  Email:
                </span>
                <span>{user?.email || "Email"}</span>
                <span
                  className="border border-green-200 bg-green-500 p-1.5 rounded-md hover:bg-green-600 ml-3 text-white cursor-pointer"
                  href="change-email"
                  onClick={() => {
                    navigate("/user/information/change-email");
                  }}
                >
                  Change
                </span>
              </div>
              <div className="p-1.5">
                <span className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right">
                  Phone:
                </span>
                <span>{user?.phone || "0000000000"}</span>
                <span
                  className="border border-green-200 bg-green-500 p-1.5 rounded-md hover:bg-green-600 ml-3 text-white cursor-pointer"
                  onClick={() => {
                    navigate("/user/information/change-phone");
                  }}
                >
                  Change
                </span>
              </div>
              <div className="p-1.5">
                <label
                  htmlFor="gender"
                  className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={genderList[user.gender]}
                  className="border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent px-2 py-1.5"
                  onChange={(e) => {
                    setData({ ...data, gender: e.target.value });
                  }}
                >
                  {genderList.map((item, index) => {
                    if (index === user.gender)
                      return (
                        <option
                          key={index}
                          onClick={(e) => {
                            user.gender = e.target.value;
                          }}
                        >
                          {item}
                        </option>
                      );
                    else
                      return (
                        <option
                          key={index}
                          onClick={(e) => {
                            user.gender = e.target.value;
                          }}
                        >
                          {item}
                        </option>
                      );
                  })}
                </select>
              </div>
              <div className="p-1.5">
                <span className="font-semibold w-16 sm:w-32 mr-5 inline-block text-right">
                  Birthday:
                </span>
                <div className="inline-block">
                  <input
                    type="date"
                    defaultValue={changeDateToString(user?.DOB || "")}
                    className="border rounded-md px-2 py-1.5 border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    onChange={(e) => {
                      setData({ ...data, DOB: e.target.value });
                      console.log(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div
              id="overlay"
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 items-center justify-center hidden"
              ref={overlayRef}
            >
              <div id="messageBox" className="bg-white p-4 rounded-md relative">
                <p className="mb-4 font-semibold">{error}</p>
                <button
                  id="closeButton"
                  className="absolute w-6 h-6 rounded-full bg-red-400 -top-3 -right-3 text-white flex items-center justify-center hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  onClick={() => {
                    overlayRef.current.classList.add("hidden");
                  }}
                >
                  <FaX />
                </button>
              </div>
            </div>
            <div className="w-2/5 min-w-max flex flex-col justify-center items-center gap-2 border-l-2 border-gray-300 px-5">
              <div className="w-32 h-32 rounded-full">
                <img
                  src={tempImage || "/avatar.avif"}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover  "
                ></img>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="border border-green-200 bg-green-500 p-1.5 rounded-md hover:bg-green-600 text-white cursor-pointer inline-block"
                >
                  Change
                </label>
              </div>
              <div>
                Maximum file size 1 MB <br /> Format: .JPEG, .PNG
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="border border-green-200 p-1.5 px-5 mx-auto rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-white font-semibold "
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default Resume;
