import {
  FaCommentAlt,
  FaPlus,
  FaShoppingBag,
  FaStar,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import Catalog from "../Components/Sidebar/Catalog";
import CardList from "../Components/Card/CardList";
import ButtonPage from "../Components/Button/ButtonPage";
import MainSortBar from "../Components/Layouts/MainSortBar";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import tokenAxiosInstance from "../Axios/Token.a";

const Store = () => {
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const storeId = Cookies.get("storeId");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [store, setStore] = useState({});

  const getStore = async () => {
    try {
      const res = await tokenAxiosInstance.get(
        `/store/api/get?userId=${user?._id}`
      );
      if (res.data) {
        console.log(res.data.data);
        setStore(() => res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetStoreByStoreIdRef = useRef();
  GetStoreByStoreIdRef.current = getStore;

  useEffect(() => {
    setPage(1);
    GetStoreByStoreIdRef.current(storeId);
  }, [url, storeId]);

  return (
    <div className="min-w-max w-4/5 mx-auto justify-center">
      {/* Store */}
      <div className="flex flex-col">
        <div className="flex mx-4 mb-2 gap-5 bg-gray-100 rounded-md min-w-max shadow-md">
          <img
            src="/logoShop.avif"
            alt="bg"
            className="brightness-50 opacity-70 inline-block w-[350px] h-[150px] object-cover rounded-md absolute"
          />
          <div className=" flex flex-col p-3 w-[350px] h-[150px] text-white font-semibold z-10 shadow-md">
            <div className="flex gap-5 justify-start items-start m-1 w-[350px]">
              <img
                src="/avatar.avif"
                alt="logoShop"
                className="w-20 h-20 object-cover rounded-full ring-gray-300 ring-4 ring-opacity-50"
              />
              <div className="inline-block mt-4">
                <span className="text-xl ">{store?.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1 min-w-max">
              <span className="px-3 py-1 border rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-green-500">
                <FaPlus></FaPlus>
                Follow
              </span>
              <span className="px-3 py-1 border rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-green-500">
                <FaCommentAlt></FaCommentAlt>
                Chat
              </span>
            </div>
          </div>
          <div className="flex justify-around gap-10 text-xl items-center p-4 font-semibold h-full w-full mr-40">
            <div>
              <div>
                <FaShoppingBag className="inline-block mr-2"></FaShoppingBag>
                {/* Products: {products.length} */}
              </div>
              <div>
                <FaUserPlus className="inline-block mr-2"></FaUserPlus>
                Following:
                {}
              </div>
            </div>
            <div>
              <div>
                <FaUsers className="inline-block mr-2"></FaUsers>Followers: {}
              </div>
              <div>
                <FaStar className="inline-block mr-2"></FaStar>Rating: {}
              </div>
              <div>
                <FaUserCheck className="inline-block mr-2"></FaUserCheck>
                Joined: {}
              </div>
            </div>
          </div>
        </div>
        {user?.role && (
          <div className="flex gap-3 justify-center items-center py-1.5 bg-gray-200 mb-2 mx-4 rounded-md">
            <button
              className="py-1 px-3 border border-gray-100 bg-gray-100 rounded-md font-semibold hover:bg-green-500 hover:text-white hover:border-green-500"
              onClick={() => {
                window.location.href = `/shop/add-product`;
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-5 mx-4">
        <Catalog setUrl={setUrl} url={url}></Catalog>
        <div className="flex flex-col w-full">
          <MainSortBar
            setUrl={setUrl}
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            url={url}
          ></MainSortBar>
          <CardList
            storeId={storeId}
            url={url}
            page={page}
            setTotalPage={setTotalPage}
          ></CardList>
          <div className="mx-auto mb-2">
            <ButtonPage
              page={page}
              totalPage={totalPage}
              setPage={setPage}
            ></ButtonPage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
