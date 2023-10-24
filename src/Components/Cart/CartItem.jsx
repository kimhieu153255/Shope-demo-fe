import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  buyProduct,
  checkedProduct,
  encreaseQuantity,
  removeCart,
  resetQuantity,
  updateColor,
  updateSize,
} from "../../redux-toolkit/CartSlice";
import axios from "axios";
import { FaX } from "react-icons/fa6";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ img, price, name, check, id, color, size, num }) => {
  const CaretRef = useRef();
  const DropRef = useRef();
  const [count, setCount] = useState(num);
  const [checkItem, setCheckItem] = useState(check);
  const [colorChosen, setColorChosen] = useState();
  const [sizeColor, setSizeColor] = useState({});
  const [currentSize, setCurrentSize] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [sizeChosen, setSizeChosen] = useState();
  const [error, setError] = useState();
  const overlayRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const BuyList = useSelector((state) => state.cart.BuyList);

  const HandleOverlayHidden = () => {
    setError("");
    overlayRef.current?.classList.add("hidden");
    overlayRef.current?.classList.remove("flex");
  };

  const HandleOverlayFlex = () => {
    setError("Please Choose Color and Size");
    overlayRef.current?.classList.remove("hidden");
    overlayRef.current?.classList.add("flex");
  };

  const GetNumberProductBySizeColor = async (id, color, size) => {
    try {
      const res = await axios.get(
        "https://shop-demo1.onrender.com/product/api/getNumberProductBySizeColor",
        {
          params: {
            color,
            size,
            productId: id,
          },
        }
      );
      if (res.data) {
        return res.data.data;
      }
      return 0;
    } catch (err) {
      console.log(err);
      HandleOverlayFlex();
      return 0;
    }
  };

  const GetSizeByColor = async (id, color) => {
    try {
      const res = await axios.get(
        "https://shop-demo1.onrender.com/product/api/getSizeByColor",
        {
          params: {
            color,
            id,
          },
        }
      );
      if (res.data) {
        setCurrentSize(res.data.data);
      } else setCurrentSize([]);
    } catch (err) {
      console.log(err);
      setCurrentSize([]);
    }
  };

  const GetColorBySize = async (id, size) => {
    try {
      const res = await axios.get(
        "https://shop-demo1.onrender.com/product/api/getColorBySize",
        {
          params: {
            size,
            id,
          },
        }
      );
      if (res.data) {
        setCurrentColor(res.data.data);
      } else setCurrentColor([]);
    } catch (err) {
      console.log(err);
      setCurrentColor([]);
    }
  };

  const GetAllColorAndSize = async (id) => {
    try {
      const res = await axios.get(
        "https://shop-demo1.onrender.com/product/api/getAllSizeAndColor",
        {
          params: {
            id,
          },
        }
      );
      if (res.data) {
        setSizeColor(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateCart = async (id, color, size, quantity) => {
    try {
      const res = await axios.put(
        "https://shop-demo1.onrender.com/cart/api/update",
        {
          productId: id,
          color,
          size,
          quantity,
          userId: JSON.parse(Cookies.get("user") || null)._id,
        }
      );
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCart = async (id, color, size) => {
    try {
      const res = await axios.delete(
        "https://shop-demo1.onrender.com/cart/api/delete",
        {
          data: {
            productId: id,
            color: color ? color : null,
            size: size ? size : null,
            userId: JSON.parse(Cookies.get("user") || null)._id,
          },
        }
      );
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCount(num);
    setCheckItem(check);
  }, [num, check]);

  useEffect(() => {
    GetAllColorAndSize(id);
    setColorChosen(color);
    setSizeChosen(size);
    dispatch(updateColor({ id, color }));
    dispatch(updateSize({ id, size }));
  }, [color, dispatch, id, size]);

  useEffect(() => {
    if (colorChosen) GetSizeByColor(id, colorChosen);
  }, [colorChosen, id]);

  useEffect(() => {
    if (sizeChosen) GetColorBySize(id, sizeChosen);
  }, [id, sizeChosen]);

  return (
    <div className="min-w-max flex justify-around items-center gap-3 w-full m-auto py-2 px-4 hover:bg-gray-50 border rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="inline-block text-lg w-5 h-5"
          checked={checkItem}
          onChange={() => {
            dispatch(checkedProduct(id));
            dispatch(
              buyProduct({
                check,
                id,
                colorChosen,
                sizeChosen,
                num,
                price,
                name,
                imgSrc: img,
              })
            );
            console.log(BuyList);
          }}
        />
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product/${id}`);
          }}
        >
          <div>
            <img
              src={img ? img : "/avatar.avif"}
              alt="img"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          <div>
            <div className="line-clamp-2 w-40 font-semibold">{name}</div>
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => {
          DropRef.current?.classList.remove("hidden");
          CaretRef.current?.classList.add("rotate-180");
        }}
        onMouseLeave={() => {
          CaretRef.current?.classList.remove("rotate-180");
          DropRef.current?.classList.add("hidden");
        }}
      >
        <button className="border bg-gray-100 px-5 py-2 rounded-lg">
          <div className="flex items-center">
            Button
            <div className="inline-block" ref={CaretRef}>
              <FaCaretDown></FaCaretDown>
            </div>
          </div>
          {colorChosen && <span>{colorChosen}</span>}
          {colorChosen && sizeChosen && <span> - </span>}
          {sizeChosen && <span> {sizeChosen}</span>}
        </button>
        {sizeColor && (
          <div
            className="hidden absolute bg-gray-100 p-2 border rounded-md shadow-md"
            ref={DropRef}
          >
            {sizeColor.colors && (
              <div className="font-semibold">
                color:
                {sizeColor.colors.map((item, ind) => {
                  return (
                    <div
                      key={ind}
                      className={`inline-block border-2 px-2 py-1 rounded-md font-normal hover:border-green-500 hover:text-green-500 mr-1 ${
                        colorChosen === item &&
                        "border-green-500 text-green-500"
                      } ${
                        currentColor &&
                        currentColor?.indexOf(item) === -1 &&
                        `opacity-50`
                      } `}
                      onClick={async () => {
                        if (currentColor?.indexOf(item) === -1) return;
                        setColorChosen(item);
                        setCount(1);
                        dispatch(resetQuantity(id));
                        dispatch(updateColor({ id, color: item }));
                        updateCart(id, item, sizeChosen, 0);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
            {sizeColor.sizes && (
              <div className="font-semibold mt-1">
                size:
                {sizeColor.sizes.map((item) => (
                  <div
                    key={item}
                    className={`inline-block border-2 px-2 py-1 rounded-md font-normal hover:border-green-500 hover:text-green-500 mr-1 ${
                      sizeChosen === item && `border-green-500 text-green-500`
                    } ${
                      currentSize &&
                      currentSize?.indexOf(item) === -1 &&
                      `opacity-50`
                    }`}
                    onClick={() => {
                      if (currentSize?.indexOf(item) === -1) return;
                      setSizeChosen(item);
                      setCount(1);
                      dispatch(resetQuantity(id));
                      dispatch(updateSize({ id, size: item }));
                      updateCart(id, colorChosen, item, 0);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div>{price}</div>
      <div>
        <div className="flex w-32">
          <button
            className="px-3 py-2 bg-gray-100 border rounded-l-md text-md text-center items-center justify-center hover:bg-green-500 hover:text-white"
            onClick={() => {
              if (!colorChosen || !sizeChosen) {
                HandleOverlayFlex();
                return;
              }
              setCount((count) => {
                if (count > 1) return count - 1;
                return count;
              });
              if (count > 1) {
                dispatch(encreaseQuantity({ id, isEncrease: false }));
                updateCart(id, colorChosen, sizeChosen, -1);
              }
            }}
          >
            <FaMinus />
          </button>
          <input
            type="text"
            className="w-16 text-center border-t border-b text-md font-semibold"
            value={count}
            onChange={(e) => {
              if (e.target.value <= 0) return setCount(1);
              setCount(e.target.value);
            }}
          ></input>
          <button
            className="px-3 py-2 bg-gray-100 border rounded-r-md text-md text-center items-center justify-center hover:bg-green-500 hover:text-white"
            onClick={async () => {
              if (!colorChosen || !sizeChosen) {
                HandleOverlayFlex();
                return;
              }
              const number = await GetNumberProductBySizeColor(
                id,
                colorChosen,
                sizeChosen
              );
              if (number >= 1) {
                setCount((count) => count + 1);
                dispatch(encreaseQuantity({ id, isEncrease: true }));
                updateCart(id, colorChosen, sizeChosen, 1);
              } else {
                dispatch(addMessage(`Out of stock`));
                setTimeout(() => {
                  dispatch(removeMessage());
                }, 1000);
              }
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="w-20 font-bold text-red-500 ml-5"> {count * price}</div>
      <button
        className="border p-2 px-3 rounded-lg bg-green-500 hover:bg-green-600 hover:ring-green-300 text-white font-semibold"
        onClick={async () => {
          await deleteCart(id, colorChosen, sizeChosen);
          dispatch(
            removeCart({
              id,
              color: colorChosen,
              size: sizeChosen,
            })
          );
          dispatch(addMessage(`Delete ${name} successfully`));
          setTimeout(() => {
            dispatch(removeMessage());
          }, 1000);
        }}
      >
        Delete
      </button>
      <div
        id="overlay"
        className="fixed top-0 left-0 w-full h-full bg-opacity-70 bg-black items-center justify-center hidden"
        ref={overlayRef}
      >
        <div
          id="messageBox"
          className="bg-white m-auto p-5 rounded-md relative"
        >
          <p className="font-bold text-lg text-red-500">{error}</p>
          <button
            id="closeButton"
            className="absolute w-5 h-5 text-sm rounded-full bg-red-400 -top-2 -right-2 text-white flex items-center justify-center hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            onClick={HandleOverlayHidden}
          >
            <FaX />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  img: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  check: PropTypes.bool,
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  num: PropTypes.number,
};

export default CartItem;
