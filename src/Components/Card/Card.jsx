import { useRef } from "react";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { setCartItems } from "../../redux-toolkit/CartSlice";
import PropTypes from "prop-types";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";

const Card = ({ id, imgSrc, title, events, cost, num, rate }) => {
  const displayRef = useRef();
  const dispatch = useDispatch();
  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `http://localhost:20474/cart/api/add`,
        {
          userId: JSON.parse(Cookies.get("user")?.toString() || null)._id,
          productId,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      if (res.data.data) {
        console.log(res.data.data);
        // dispatch(AddToCart(res.data.data));
        dispatch(addMessage(`Add ${title} successfully`));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 3000);
      }
    } catch (error) {
      console.log(error.response?.data);
      dispatch(addMessage(`Add ${title} Fail`));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
    }
  };

  const url = `http://localhost:20474/cart/api/get`;
  const loadData = async (user, token) => {
    if (!user || !token) return;
    const res = await axios.get(url, {
      params: { userId: user._id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setCartItems(res.data?.ListCart || []));
  };

  const handleNavigateInforCard = (e) => {
    // not navigate when click button add to cart (displayRef)
    if (e.target === displayRef.current) return;
    window.location.href = `/product/${id}`;
  };

  return (
    <div
      className="inline-block w-44 bg-gray-200 shadow-md hover:border hover:border-green-500 hover:ring-green-500 rounded-lg cursor-pointer hover:scale-105 hover:border-b-0 hover:rounded-b-none transition-all duration-300"
      onMouseOver={() => displayRef.current.classList.remove("hidden")}
      onMouseLeave={() => displayRef.current.classList.add("hidden")}
    >
      <div onClick={handleNavigateInforCard}>
        <div className="rounded-lg h-48 m-1">
          <img
            src={imgSrc || "/defaultImage.png"}
            alt="image"
            className="inline-block rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-2 text-sm">
          <div className="word-break line-clamp-2 overflow-hidden font-semibold text-base">
            {title || "this is a title"}
          </div>
          <div className="h-6">
            {events &&
              events.map((event) => (
                <div
                  key={event}
                  className="p-1 border shadow-sm inline-block bg-red-500 visible rounded-md text-white text-xs"
                >
                  {event}
                </div>
              ))}
          </div>
          <Rating rate={rate}></Rating>
          <div className="flex justify-between bottom-0 font-semibold ">
            <span>{cost || "xxxxx đ"}</span>
            <span>Sold: {num || "0"}</span>
          </div>
        </div>
      </div>
      <div
        className="hidden w-full border border-green-500 rounded-b-lg ring-1 hover:ring-green-600 ring-green-500 transition-all duration-300 absolute"
        ref={displayRef}
      >
        <button
          className="w-full bg-green-500 text-white font-semibold py-1.5 rounded-lg rounded-t-none hover:bg-green-600 z-10 duration-300 transition-all"
          onClick={async () => {
            await addToCart(id);
            await loadData(
              JSON.parse(Cookies.get("user") || null),
              Cookies.get("token")
            );
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  events: PropTypes.array,
  cost: PropTypes.number,
  num: PropTypes.number,
  rate: PropTypes.number,
};

export default Card;
