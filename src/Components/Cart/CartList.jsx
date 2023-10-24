import CartItem from "./CartItem";
import { FaShoppingBasket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { checkedStore } from "../../redux-toolkit/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartList = () => {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.cart.CartItems);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 p-5 min-w-max">
      {cartItems.length === 0 && (
        <div className="flex flex-col justify-center items-center my-20">
          <div className="text-gray-400 text-9xl h-full inline-block">
            <FaShoppingBasket></FaShoppingBasket>
          </div>
          <button
            onClick={() => navigate("/")}
            className="border-green-500 bg-green-500 hover:bg-green-600 text-white font-semibold text-xl px-4 py-1.5 rounded-md"
          >
            back to Home
          </button>
        </div>
      )}
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="w-4/5 m-auto p-5 border rounded-md bg-gray-50 min-w-max"
        >
          <div className="flex gap-2 items-center px-3">
            <div className="inline-block">
              <input
                type="checkbox"
                className="text-lg w-5 h-5 "
                checked={item.checked}
                onChange={() => {
                  dispatch(checkedStore(item.store));
                }}
              />
            </div>
            <h1 className="font-semibold text-xl mb-2">{item.store}</h1>
          </div>
          <div className="flex flex-col gap-3">
            {item.items?.map((pro, ind) => {
              return (
                <CartItem
                  ind={index}
                  img={pro.img}
                  num={pro.quantity}
                  id={pro.id}
                  check={pro.check}
                  key={ind}
                  numberPro={pro.numberPro}
                  color={pro.color}
                  size={pro.size}
                  price={pro.price}
                  name={pro.name}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
