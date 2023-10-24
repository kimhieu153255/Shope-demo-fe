import {
  FaFacebook,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ArrShop = [
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Terms of use",
    link: "/term/use",
  },
  {
    title: "Privacy Policy",
    link: "/term/privacy",
  },
];
const ArrSupport = [
  {
    title: "FAQ",
    link: "/support/faq",
  },
  {
    title: "Contacts",
    link: "/support/contacts",
  },
  {
    title: "Buying guide",
    link: "/support/buying-guide",
  },
  {
    title: "Return guide",
    link: "/support/return-guide",
  },
  {
    title: "Warranty Policy",
    link: "/support/warranty-policy",
  },
];
const ArrCategory = [
  {
    title: "Shirt",
    link: "#",
  },
  {
    title: "Shoes",
    link: "#",
  },
  {
    title: "Accessories",
    link: "#",
  },
  {
    title: "Hat",
    link: "#",
  },
  {
    title: "Glasses",
    link: "#",
  },
  {
    title: "Wallet",
    link: "#",
  },
];
const ArrFollow = [
  {
    title: "Facebook",
    link: "#",
    icon: <FaFacebook className="inline-block text-2xl"></FaFacebook>,
  },
  {
    title: "Instagram",
    link: "#",
    icon: <FaInstagram className="inline-block text-2xl"></FaInstagram>,
  },
  {
    title: "Twitter",
    link: "#",
    icon: <FaTwitter className="inline-block text-2xl"></FaTwitter>,
  },
  {
    title: "Youtube",
    link: "#",
    icon: <FaYoutube className="inline-block text-2xl"></FaYoutube>,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 mt-5 min-w-fit">
      <div className="pt-10 pb-5 flex justify-evenly border-b-gray-500 border-2">
        <div className="flex flex-col text-lg w-40 min-w-max">
          <h2 className="font-semibold text-xl">Shop</h2>
          <hr className="inline-block bg-green-500 h-1 w-10 mb-5 rounded-2xl" />
          {ArrShop.map((item, index) => (
            <span
              key={index}
              className="py-1 cursor-pointer transition-all hover:pl-3 duration-300 hover:text-green-600 pl-1 hover:font-semibold"
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="flex flex-col text-lg w-40  min-w-max">
          <h2 className="font-semibold text-xl">Suport center</h2>
          <hr className="inline-block bg-green-500 h-1 w-10 mb-5 rounded-2xl" />
          {ArrSupport.map((item, index) => (
            <span
              key={index}
              className="py-1 cursor-pointer transition-all hover:pl-3 duration-300 hover:text-green-600 pl-1 hover:font-semibold"
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="flex flex-col text-lg w-40  min-w-max">
          <h2 className="font-semibold text-xl">Category</h2>
          <hr className="inline-block bg-green-500 h-1 w-10 mb-5 rounded-2xl" />
          {ArrCategory.map((item, index) => (
            <span
              key={index}
              className="py-1 cursor-pointer transition-all hover:pl-3 duration-300 hover:text-green-600 pl-1 hover:font-semibold"
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="flex flex-col text-lg w-40 min-w-max">
          <h2 className="font-semibold text-xl">Follow us</h2>
          <hr className="inline-block bg-green-500 h-1 w-10 mb-5 rounded-2xl" />
          {ArrFollow.map((item, index) => (
            <span
              key={index}
              className="py-1 cursor-pointer transition-all hover:pl-3 duration-300 hover:text-green-600 pl-1 hover:font-semibold leading-7"
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-lg pt-5 pb-10">
        <span className="ml-5 mt-5 flex items-center gap-2">
          <FaRegCopyright className="inline-block text-base"></FaRegCopyright>
          <span className="font-semibold">2023 - ShopDemo</span>
        </span>
        <span>
          Address: 227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City
        </span>
      </div>
    </div>
  );
};

export default Footer;
