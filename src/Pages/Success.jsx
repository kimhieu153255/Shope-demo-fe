import { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import tokenAxiosInstance from "../Axios/Token.a";

const Success = () => {
  const SaveOrder = async () => {
    const sessionId = localStorage.getItem("sessionId");
    console.log(sessionId);
    let order = JSON.parse(localStorage.getItem("Order"));
    console.log(order);
    order = { ...order, sessionId: sessionId };
    if (!order) return;
    try {
      const res = await tokenAxiosInstance.post("/api/order/save", order);
      console.log(res.data);
      if (res.data.data) {
        localStorage.removeItem("BuyList");
        localStorage.removeItem("Order");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const SaveOrderRef = useRef();
  SaveOrderRef.current = SaveOrder;
  useEffect(() => {
    SaveOrderRef.current();
  }, []);

  return (
    <div className="text-center my-32">
      <FaCheck className="inline-block text-9xl text-green-500"></FaCheck>
      <h1 className="text-3xl font-semibold mt-5">Placed order successfully</h1>
    </div>
  );
};

export default Success;
