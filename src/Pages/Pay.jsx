import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMessage, removeMessage } from "../redux-toolkit/MessageSlice";
import AddAddress from "../Components/Address/AddAddress";
import disMessge from "../helpers/disMessage";
import tokenAxiosInstance from "../Axios/Token.a";

const Pay = () => {
  const tempBuyList = JSON.parse(localStorage.getItem("BuyList") || "[]");
  const BuyListRe = useSelector((state) => state.cart.BuyList);
  const BuyList = tempBuyList.length > 0 ? tempBuyList : BuyListRe;
  const user = JSON.parse(Cookies.get("user")?.toString() || "{}");
  const [addresses, setAddresses] = useState([]);
  const [choosenAddressTemp, setchoosenAddressTemp] = useState({});
  const [choosenAddress, setchoosenAddress] = useState();
  const [isHidden, setIsHidden] = useState(true);
  const [isAddAddress, setIsAddAddress] = useState(true);
  const [method, setMethod] = useState("payment on delivery");
  const [methodDelivery, setMethodDelivery] = useState("standard delivery");
  const [costDelivery, setCostDelivery] = useState(30000);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalCost = BuyList.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const funcGetAddresses = async () => {
    const res = await tokenAxiosInstance.get(
      `/address/api/get?userId=${user?._id}`
    );
    if (res.data) {
      console.log(res.data);
      setAddresses(res.data.data);
      setchoosenAddress(res.data.data.filter((item) => item.isDefault)[0]);
      if (!choosenAddress) setchoosenAddress(res.data.data[0]);
      setchoosenAddressTemp(res.data.data.filter((item) => item.isDefault)[0]);
    }
  };
  const getAddressesRef = useRef();
  getAddressesRef.current = funcGetAddresses;

  const handleOrder = async () => {
    if (!choosenAddress) {
      disMessge(
        dispatch,
        addMessage,
        removeMessage,
        "Please choose address to delivery!"
      );
      return;
    }
    const data = {
      userId: user._id,
      productOrderArr: BuyList.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
          imgSrc: item.imgSrc,
          name: item.name,
          color: item.color,
          size: item.size,
          price: item.price,
        };
      }),
      totalPrice: totalCost + costDelivery,
      addressUserId: choosenAddress._id,
    };
    localStorage.setItem("Order", JSON.stringify(data));

    try {
      if (method === "payment on delivery") {
        const res = await tokenAxiosInstance.post("/api/order/add", data);
        console.log(res.data);
        if (res.data) {
          window.location.href = "/order/success";
        }
      } else if (method === "payment by card") {
        const res = await tokenAxiosInstance.post(
          "/api/order/create-checkout-session",
          data
        );
        console.log(res.data);
        if (res.data.url) {
          console.log(res.data);
          localStorage.setItem("sessionId", res.data?.sessionId || "");
          window.location.href = res.data.url;
        }
      }
    } catch (err) {
      console.log(err);
      window.location.href = "/order/canceled";
    }
  };

  useEffect(() => {
    if (BuyList.length === 0) {
      navigate("/");
      dispatch(addMessage("Please choose product to buy!"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
      return;
    }
    getAddressesRef.current();
  }, [BuyList.length, dispatch, navigate, isAddAddress]);

  return (
    <div className=" w-full xl:w-4/5  mx-auto min-w-max">
      <div className=" border bg-gray-100 p-5">
        <div className="relative">
          <div className="flex items-center gap-2 text-xl font-semibold text-green-500">
            <FaLocationDot></FaLocationDot>
            Delivery Address
          </div>
          {choosenAddress && (
            <div className="text-lg mt-2 flex justify-between">
              <div>
                <span className="font-semibold">
                  {choosenAddress.name} {choosenAddress.phone}
                </span>
                <span className="pl-2 ">
                  {choosenAddress.specific}, {choosenAddress.ward},{" "}
                  {choosenAddress.province}
                </span>
                {choosenAddress.isDefault && (
                  <span className="ml-2 px-2 py-1 border-green-500 text-green-500 rounded-md border text-sm">
                    Default
                  </span>
                )}
              </div>
              <button
                className="ml-2 px-3 py-2 border-green-500 bg-green-500 font-semibold text-white rounded-md border text-sm hover:bg-green-600"
                onClick={() => setIsHidden(false)}
              >
                Change
              </button>
            </div>
          )}
          {!isHidden && (
            <div className="fixed top-0 left-0 h-screen w-full">
              <div className="bg-gray-500 opacity-50 inset-0 fixed z-10"></div>
              <div className="m-auto py-2 z-20 absolute inset-0 w-[600px] h-[600px] bg-white">
                <div className="text-xl px-5 py-3 font-bold border-b h-[50px]">
                  My Addresses
                </div>
                {addresses.length >= 0 && (
                  <div
                    className={`${
                      addresses.length > 5 && "overflow-y-scroll"
                    } h-[450px] border-b`}
                  >
                    {addresses.map((item, ind) => {
                      return (
                        <label className="mt-2" key={ind}>
                          <div className="flex px-5 items-center gap-3 h-[75px] hover:bg-green-400">
                            <input
                              type="radio"
                              name="address"
                              className="inline-block w-4 h-4"
                              value={item._id}
                              checked={item._id === choosenAddressTemp?._id}
                              onChange={() => setchoosenAddressTemp(item)}
                            />
                            <div>
                              <span className="font-semibold">
                                {item.name} {item.phone}
                              </span>
                              <span className="line-clamp-2">
                                {item.specific} - {item.ward} - {item.province}
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                    <div
                      className=" mt-2 px-3 py-3 w-80 mx-auto text-center border rounded-md bg-green-500 text-white font-semibold hover:bg-green-600"
                      onClick={() => {
                        setIsAddAddress(false);
                      }}
                    >
                      Add new address
                    </div>
                  </div>
                )}
                <div className="absolute bottom-5 right-5 border-t">
                  <button
                    className="px-3 py-2 w-28 border-red-500 border rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 mr-5 mt-2"
                    onClick={() => {
                      setchoosenAddressTemp(choosenAddress);
                      setIsHidden(true);
                    }}
                  >
                    Cancle
                  </button>
                  <button
                    className="px-3 py-2 w-28 border-green-500 border rounded-md bg-green-500 text-white font-semibold hover:bg-green-600"
                    onClick={() => {
                      setchoosenAddress(choosenAddressTemp);
                      setIsHidden(true);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          <AddAddress
            isHidden={isAddAddress}
            setIsHidden={setIsAddAddress}
          ></AddAddress>
        </div>
      </div>

      <div className=" border bg-gray-100 p-5 mt-2">
        <div className="flex justify-between font-semibold py-2">
          <span className="w-3/5 text-xl">Product</span>
          <div className="w-2/5 flex text-center text-gray-500 text-lg">
            <span className="w-full">Price</span>
            <span className="w-full">Quantity</span>
            <span className="w-full text-right">Total</span>
          </div>
        </div>

        {BuyList.length > 0 &&
          BuyList.map((item, ind) => (
            <div
              className="flex items-center justify-between font-semibold mt-2 py-3"
              key={ind}
            >
              <span className="w-3/5 text-lg flex items-center">
                <div className="w-12 h-12">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </div>
                <span className="pl-2 line-clamp-1 w-[480px]">{item.name}</span>
                <div className="pl-2 w-40 text-gray-500">
                  Color: {item.color}
                </div>
              </span>
              <div className="w-2/5 flex text-center ">
                <span className="w-full">₫{item.price}</span>
                <span className="w-full">{item.quantity}</span>
                <span className="w-full text-right">
                  {item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className=" border bg-gray-100 p-5 mt-2">
        <div className="flex justify-between items-center border-b pb-5">
          <span className="text-xl font-semibold">Payment methods</span>
          <div>
            <div
              className={
                `px-3 py-2  border rounded-md font-semibold hover:text-green-500 hover:border-green-500 ml-5 inline-block cursor-pointer ` +
                (method === "payment on delivery"
                  ? " border-green-500 text-green-500"
                  : "border-gray-500")
              }
              onClick={() => {
                setMethod("payment on delivery");
                setCostDelivery(30000);
                setMethodDelivery("standard delivery");
              }}
            >
              Payment on delivery
            </div>
            <div
              className={
                `px-3 py-2  border rounded-md font-semibold hover:text-green-500 hover:border-green-500 ml-5 inline-block cursor-pointer ` +
                (method === "payment by card"
                  ? " border-green-500 text-green-500"
                  : "border-gray-500")
              }
              onClick={() => {
                setMethod("payment by card");
                setCostDelivery(10000);
              }}
            >
              Payment by card
            </div>
          </div>
        </div>
        {method === "payment on delivery" && (
          <div className="text-lg flex justify-between py-5 border-b">
            <div className="font-semibold">Method delivery</div>
            <div>
              <label className="mt-2 block">
                <input
                  type="radio"
                  value={30000}
                  checked={methodDelivery === "standard delivery"}
                  onChange={() => {
                    setMethodDelivery("standard delivery");
                    setCostDelivery(30000);
                  }}
                />
                <span className="ml-2">Standard delivery</span>
                <span className="ml-2 text-gray-500">30.000đ</span>
              </label>
              <label className="mt-2 block">
                <input
                  type="radio"
                  value={50000}
                  checked={methodDelivery === "fast delivery"}
                  onChange={() => {
                    setMethodDelivery("fast delivery");
                    setCostDelivery(50000);
                  }}
                />
                <span className="ml-2">Fast delivery</span>
                <span className="ml-2 text-gray-500">50.000đ</span>
              </label>
            </div>
          </div>
        )}

        <div className="w-96 ml-auto py-5">
          <div className="flex justify-between items-center mt-5">
            <span className="text-xl font-semibold">Total cost of goods:</span>
            <span className="text-xl font-semibold">{totalCost}</span>
          </div>
          <div className="flex justify-between items-center mt-5">
            <span className="text-xl font-semibold">Transport fee:</span>
            <span className="text-xl font-semibold">{costDelivery}</span>
          </div>
          <div className="flex justify-between items-center mt-5">
            <span className="text-xl font-semibold">Total cost:</span>
            <span className="text-2xl font-semibold text-green-500">
              VND {totalCost + costDelivery}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5 border-t">
          <div>
            <span>
              Clicking <i>Place Order</i> means you agree to abide by{" "}
            </span>
            <a
              href="/term/use"
              className="text-green-500 font-semibold hover:text-green-600"
            >
              the ShopDemo Terms
            </a>
          </div>
          <div
            className="px-5 py-2 border inline-block rounded-lg bg-green-500 text-white hover:bg-green-600 text-xl font-semibold cursor-pointer"
            onClick={handleOrder}
          >
            Order
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
