// import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
// import { payment } from "../../redux-toolkit/CartSlice";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const CartItems = useSelector((state) => state.cart.CartItems);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const BuyList = useSelector((state) => state.cart.BuyList);
  const navigate = useNavigate();

  return (
    CartItems.length && (
      <div className="w-full px-5">
        <div className="flex items-center w-4/5 m-auto py-2 justify-around rounded-md border bg-gray-50   text-xl font-semibold min-w-[841.4px]">
          <div className="flex gap-5 text-green-500 font-bold text-2xl">
            <div>Total:</div>
            <div className="w-[300px] ">{total}</div>
          </div>
          <button
            className="px-4 py-2 bg-green-500 text-white  border rounded-md hover:bg-green-600"
            onClick={(e) => {
              e.preventDefault();
              if (BuyList.length === 0) {
                dispatch(addMessage("Please choose product!"));
                setTimeout(() => {
                  dispatch(removeMessage());
                }, 3000);
                return;
              }
              BuyList.map((item) => {
                if (!item.color || !item.size) {
                  dispatch(addMessage("Please choose color and size!"));
                  setTimeout(() => {
                    dispatch(removeMessage());
                  }, 3000);
                  return;
                }
              });
              localStorage.setItem("BuyList", JSON.stringify(BuyList));
              console.log("payment");
              navigate("/pay");
            }}
          >
            Buy
          </button>
        </div>
      </div>
    )
  );
};

export default Payment;
