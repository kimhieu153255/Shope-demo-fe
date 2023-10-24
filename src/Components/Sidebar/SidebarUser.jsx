import { useState } from "react";
import {
  FaBell,
  FaBitcoin,
  FaShoppingCart,
  FaTicketAlt,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const arrSidebar = [
  {
    title: "My account",
    icon: "user",
    content: [
      { title: "Résumé", path: "/user/information/resume" },
      { title: "Address", path: "/user/information/address" },
      { title: "Change password", path: "/user/information/changePassword" },
      {
        title: "Setting notification",
        path: "/user/information/settingNotification",
      },
    ],
  },
  {
    title: "My order",
    icon: "cart",
  },
  {
    title: "Notification",
    icon: "bell",
  },
  {
    title: "Voucher Store",
    icon: "gift",
  },
  {
    title: "Shop coint",
    icon: "coin",
  },
];

// eslint-disable-next-line react/prop-types, no-unused-vars
const SidebarUser = ({ username, avatar }) => {
  const [isDropdown, setIsDropdown] = useState(true);
  const navigate = useNavigate();
  const handleDropDown = (title) => {
    if (title != "My account") setIsDropdown(false);
    else setIsDropdown(true);
  };
  return (
    <div className="flex flex-col w-1/5 bg-gray-100 pl-3 pr-2 py-5 sm:pl-10 gap-3 text-lg min-w-max rounded-md border my-5 h-fit">
      <div className="flex items-center gap-3">
        <div className="border border-gray-400 ring-gray-100 inline-block rounded-full">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full inline-block object-cover"
          />
        </div>
        <div>{username}</div>
      </div>
      {arrSidebar &&
        arrSidebar.map((item) => (
          <div key={item.title}>
            <div
              className="flex items-center gap-2 hover:text-green-600"
              {...(item.icon === "cart" && {
                onClick: () => navigate("/user/information/order"),
              })}
            >
              {item.icon === "user" && <FaUserAlt></FaUserAlt>}
              {item.icon === "cart" && <FaShoppingCart></FaShoppingCart>}
              {item.icon === "bell" && <FaBell></FaBell>}
              {item.icon === "gift" && <FaTicketAlt></FaTicketAlt>}
              {item.icon === "coin" && <FaBitcoin></FaBitcoin>}
              <div
                className="py-2 cursor-pointer "
                onClick={handleDropDown.bind(this, item.title)}
              >
                {item.title}
              </div>
            </div>
            <div className="flex flex-col gap-1 min-w-max">
              {isDropdown &&
                item.content &&
                item.content.map((content) => (
                  <NavLink
                    key={content.title}
                    to={content.path}
                    className={({ isActive }) =>
                      (isActive ? "text-green-500 " : "") +
                      "hover:text-green-400 pl-6 min-w-max"
                    }
                  >
                    {content.title}
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarUser;
