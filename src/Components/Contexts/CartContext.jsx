import { createContext, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// const ListCart = [
//   {
//     store: "Store 1",
//     checked: false,
//     items: [
//       {
//         id: 1,
//         name: "Product 1",
//         price: 100,
//         img: "https://cf.shopee.vn/file/1f6f6f3f0f2f2f2f2f2f2f2f2f2f2f2f2f2f2f",
//         color: ["red", "blue", "green"],
//         size: ["S", "M", "L"],
//         quantity: 1,
//         check: false,
//       },
//       {
//         id: 2,
//         name: "Product 2",
//         price: 200,
//         img: "https://cf.shopee.vn/file/1f6f6f3f0f2f2f2f2f2f2f2f2f2f2f2f2f2f2f",
//         color: ["red", "blue", "green"],
//         size: ["S", "M", "L"],
//         quantity: 2,
//         check: false,
//       },
//     ],
//   },
//   {
//     store: "Store 2",
//     checked: false,
//     items: [
//       {
//         id: 3,
//         name: "Product 3",
//         price: 300,
//         img: "https://cf.shopee.vn/file/1f6f6f3f0f2f2f2f2f2f2f2f2f2f2f2f2f2f2f",
//         color: ["red", "blue", "green"],
//         size: ["S", "M", "L"],
//         quantity: 3,
//         check: false,
//       },
//       {
//         id: 4,
//         name: "Product 4",
//         price: 400,
//         img: "https://cf.shopee.vn/file/1f6f6f3f0f2f2f2f2f2f2f2f2f2f2f2f2f2f2f",
//         color: ["red", "blue", "green"],
//         size: ["S", "M", "L"],
//         quantity: 4,
//         check: false,
//       },
//       {
//         id: 5,
//         name: "Product 5",
//         price: 500,
//         img: "https://cf.shopee.vn/file/1f6f6f3f0f2f2f2f2f2f2f2f2f2f2f2f2f2f2f",
//         color: ["red", "blue", "green"],
//         size: ["S", "M", "L"],
//         quantity: 5,
//         check: false,
//       },
//     ],
//   },
// ];

const CartContext = createContext();
const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const token = Cookies.get("token");
  const LoadRef = useRef();
  const loadData = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:20474/cart/api/get`, {
        params: { userId: user._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setCartItems(res.data.ListCart);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  LoadRef.current = loadData;

  const totalQuantity = () => {
    let total = 0;
    cartItems.map((e) => {
      e.items.map(() => {
        total += 1;
      });
    });
    return total;
  };

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `http://localhost:20474/cart/api/add`,
        {
          userId: user._id,
          productId,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (res.data) {
        window.location.reload();
        //navigate về trang hiện tại
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const value = {
    cartItems,
    setCartItems,
    buyList,
    setBuyList,
    totalQuantity,
    addToCart,
  };
  return <CartContext.Provider value={value} {...props}></CartContext.Provider>;
};

export { CartContext, CartProvider };
