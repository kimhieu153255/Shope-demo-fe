import { useEffect, useRef, useState } from "react";
import OrderItem from "../Components/Order/OrderItem";
import Cookies from "js-cookie";
import tokenAxiosInstance from "../Axios/Token.a";
import { addMessage, removeMessage } from "../redux-toolkit/MessageSlice";
import { useDispatch } from "react-redux";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      const userId = JSON.parse(Cookies.get("user"))._id;
      const res = await tokenAxiosInstance.get(
        `/api/order/get?userId=${userId}`
      );
      console.log(res.data);
      if (res.data.data) setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteOrderFunc = async (orderId) => {
    try {
      const response = await tokenAxiosInstance.delete(
        `/api/order/deleteOrder?orderId=${orderId}`
      );
      if (response.data) {
        await getOrders();
        dispatch(addMessage("Delete order successfully"));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getOrdersRef = useRef();
  getOrdersRef.current = getOrders;

  useEffect(() => {
    getOrdersRef.current();
  }, []);

  return (
    <div className="w-full h-full">
      {orders.length === 0 && (
        <div className="flex justify-center items-center h-[350px]">
          <span className="text-2xl font-semibold">
            You dont have any orders
          </span>
        </div>
      )}
      {orders.map((item, index) => (
        <OrderItem item={item} key={index} DeleteOrderFunc={DeleteOrderFunc} />
      ))}
    </div>
  );
};

export default Order;
