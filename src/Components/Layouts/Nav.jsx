import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import CartListSmall from "../Cart/CartListSmall";
import { setCartItems } from "../../redux-toolkit/CartSlice";
import tokenAxiosInstance from "../../Axios/Token.a";

const NavList = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
];

const navLogin = [
  {
    path: "/user/login",
    name: "Login",
  },
  {
    path: "/user/register",
    name: "Register",
  },
];

const navLogout = [
  {
    path: "/User",
    name: "User",
  },
];

const shop = [
  {
    path: "/shop",
    name: "Shop",
  },
];

const Nav = () => {
  const [navList, setNavList] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const DropRef = useRef();
  const cartItems = useSelector((state) => state.cart.CartItems);

  const funTotalQuantity = () => {
    let total = 0;
    cartItems?.map((item) => {
      item.items?.map(() => {
        total += 1;
      });
    });
    return total;
  };
  /////////////////////////////////////
  const funcSetNavTop = async (token, user) => {
    if (!token) {
      setNavList([...NavList, ...navLogin]);
      return;
    }
    if (user.role > 0) setNavList([...NavList, ...shop, ...navLogout]);
    else setNavList([...NavList, ...navLogout]);
  };

  const handleLogout = async () => {
    if (token) {
      await tokenAxiosInstance.get("/user/api/logout");
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("storeId");
      window.location.href = "/";
    }
  };

  const loadData = async (user, token) => {
    if (!user || !token) {
      dispatch(setCartItems([]));
      return;
    }
    const res = await tokenAxiosInstance.get(
      `/cart/api/get?userId=${user._id}`
    );
    dispatch(setCartItems(res.data?.ListCart || []));
  };

  const isLogin = useRef();
  isLogin.current = funcSetNavTop;
  const isLoadData = useRef();
  isLoadData.current = loadData;

  useEffect(() => {
    let token = Cookies.get("token");
    let user = JSON.parse(Cookies.get("user")?.toString() || null);
    console.log("user", user);
    console.log("token", token);
    setToken(token);
    setUser(user);
    isLoadData.current(user, token);
    isLogin.current(token, user);
  }, []);

  return (
    <div className="shadow-md mb-2 px-[10%] bg-gray-100 min-w-max">
      {/* nav top */}
      <div className="p-1 pt-2 flex items-center justify-center gap-x-12 sm:gap-x-16 w-auto text-lg font-semibold min-w-max z-30 inset-1">
        {navList &&
          navList?.map((item, index) => {
            if (item.name === "User")
              return (
                <div
                  key={index}
                  className="z-20"
                  onMouseOver={() => setIsDropdown(true)}
                  onMouseLeave={() => setIsDropdown(false)}
                >
                  <div
                    className="hover:text-green-400 cursor-pointer"
                    onClick={() => navigate("/user/information/resume")}
                  >
                    <div className="flex items-center gap-x-2">
                      <img
                        src={user?.avatar || "/avatar.avif"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full inline-block object-cover"
                      />
                      {user?.username || "User"}
                    </div>
                  </div>
                  {isDropdown && (
                    <div className="absolute top-10 bg-gray-200 shadow-md rounded-md py-2 px-8 flex flex-col gap-2">
                      <button
                        className="hover:text-green-400 cursor-pointer border-b pb-1"
                        onClick={() => navigate("/user/information/resume")}
                      >
                        Information
                      </button>
                      {user?.role == 0 && (
                        <button
                          className="hover:text-green-400 cursor-pointer border-b pb-1"
                          onClick={() => navigate("/register-store")}
                        >
                          Register Store
                        </button>
                      )}
                      <div
                        onClick={handleLogout}
                        className="hover:text-green-400 cursor-pointer"
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              );
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  (isActive ? "text-green-500 " : "") + "hover:text-green-400"
                }
              >
                {item.name}
              </NavLink>
            );
          })}
      </div>
      {/* nav bottom */}
      <div className="mb-2 pb-4 flex">
        <a className="w-30" href="/">
          <img
            src="/logoShop.avif"
            alt="logo"
            className="w-32 h-20 object-cover rounded-full"
          ></img>
        </a>
        <form
          className="flex items-center justify-center w-full text-lg font-semibold gap-1"
          method="post"
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-3/4"
          />
          <button className="py-2 rounded-md px-3 border-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-500 text-white  hover:bg-green-600">
            Search
          </button>
        </form>
        <div
          className="flex justify-end ml-auto text-5xl text-green-500 self-center hover:text-green-600 cursor-pointer transition-all relative"
          onMouseOver={() => {
            DropRef.current.classList.remove("hidden");
          }}
          onMouseLeave={() => {
            DropRef.current.classList.add("hidden");
          }}
        >
          {funTotalQuantity() > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-base font-semibold">
              {funTotalQuantity()}
            </div>
          )}
          <FaShoppingCart
            onClick={() => navigate("/user/cart")}
          ></FaShoppingCart>
          <div
            className="hidden absolute mt-12 translate-x-2 shadow-md z-20"
            ref={DropRef}
          >
            <CartListSmall></CartListSmall>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
