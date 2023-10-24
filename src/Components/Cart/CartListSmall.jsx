import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartListSmall = () => {
  const cartItems = useSelector((state) => state.cart.CartItems);
  let listTemp = cartItems?.map((e) => e.items).flatMap((e) => e);

  listTemp = listTemp.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const navigate = useNavigate();
  return (
    <div>
      {cartItems?.length === 0 && (
        <div className="text-black flex flex-col font-semibold text-base min-w-max gap-2 bg-gray-100 px-3 py-2 border rounded-md ">
          <div className="w-40 h-28">
            <FaCartPlus className="text-8xl block m-auto h-full text-green-400"></FaCartPlus>
          </div>
          <span className="text-center block text-green-400">
            Cart is empty
          </span>
        </div>
      )}
      {listTemp?.length > 0 && (
        <div className="text-black flex flex-col font-semibold text-base min-w-max gap-2 bg-gray-100 px-3 py-2 border rounded-md">
          <span>Product just add</span>
          {listTemp.map((el, ind) => {
            if (ind < 5)
              return (
                <div
                  key={ind}
                  className="flex justify-between items-center min-w-max gap-10 hover:bg-green-500 px-3 py-1 rounded-md hover:text-white hover:border-green-500"
                  onClick={() => {
                    navigate(`/product/${el?.id}`);
                  }}
                >
                  <div className="flex items-center mr-10 gap-3">
                    <div className="inline-block w-12 h-12 rounded-md">
                      <img
                        src={el?.img || "/avatar.avif"}
                        alt="img"
                        className="object-cover w-12 h-12 rounded-md"
                      />
                    </div>
                    <div className="line-clamp-1">{el?.name}</div>
                  </div>
                  <div className="line-clamp-1">{el?.price}</div>
                </div>
              );
          })}
          <div className="flex justify-between">
            <span className="pl-2">Total Products : {listTemp.length}</span>
            <button
              className="border border-green-500 px-3 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white"
              onClick={() => navigate("/user/cart")}
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartListSmall;
