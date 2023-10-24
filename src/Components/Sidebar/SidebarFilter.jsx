import { useRef, useState } from "react";
import { CategoryArr } from "../../helpers/data";
import { FaAngleDown, FaAngleUp, FaFilter, FaListUl } from "react-icons/fa";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";

const SidebarFilter = ({ setUrl, url, setpage }) => {
  const total = Math.ceil(CategoryArr.length / 5);
  const [count, setCount] = useState(1);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const lowRef = useRef();
  const highRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClear = () => {
    setpage(1);
    setLowPrice(0);
    setHighPrice(0);
    const arr = url?.split("?");
    if (arr.length >= 1) setUrl(arr[0]);
    lowRef.current.value = "";
    highRef.current.value = "";
  };

  const handleApply = () => {
    if (parseFloat(lowPrice) >= parseFloat(highPrice)) {
      dispatch(addMessage("Low price is less than high price"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 3000);
      return;
    }
    setpage(1);
    console.log(url);
    if (url.includes("?")) {
      if (url.includes("from") && url.includes("to")) {
        setUrl(
          url.replace(/from=\d+&to=\d+/, `from=${lowPrice}&to=${highPrice}`)
        );
      } else if (url.includes("from")) {
        setUrl(url.replace(/from=\d+/, `from=${lowPrice}`));
        setUrl(url + `&to=${highPrice}`);
      } else if (url.includes("to")) {
        setUrl(url.replace(/to=\d+/, `to=${highPrice}`));
        setUrl(url + `&from=${lowPrice}`);
      } else {
        setUrl(url + `&from=${lowPrice}&to=${highPrice}`);
      }
    } else {
      setUrl((url) => url + `?from=${lowPrice}&to=${highPrice}`);
    }
  };

  return (
    <div className="flex flex-col min-w-max w-40 font-semibold px-3 py-3 bg-gray-100 rounded-lg border-gray-300 border">
      <div className="flex items-center justify-center text-lg gap-3 border-b-[1.5px] border-gray-300 pb-2 mb-3 w-44 font-semibold">
        <FaListUl></FaListUl>
        Category
      </div>
      <div className="px-2 flex flex-col ml-10">
        {CategoryArr.map((el, ind) => {
          if (ind < 5 * count)
            return (
              <div
                key={ind}
                className="hover:text-green-500 py-1 w-full font-semibold cursor-pointer text-base"
                onClick={(e) => {
                  e.preventDefault();
                  lowRef.current.value = "";
                  highRef.current.value = "";
                  setUrl("");
                  setpage(1);
                  navigate(`/category/${el.name}`);
                }}
              >
                <span className="w-40">{el.name}</span>
              </div>
            );
        })}
        {CategoryArr.length <= 0 && (
          <div className="text-center text-sm text-gray-500">Empty</div>
        )}
      </div>
      {/* extend collapse */}
      <div className="flex justify-center gap-1 mt-2 ">
        {count < total && (
          <span
            className="py-1 px-2 cursor-pointer flex gap-1 items-center font-semibold border border-gray-300 rounded-md hover:bg-green-500 text-sm bg-gray-200"
            onClick={() =>
              setCount((count) => {
                if (count < total) return count + 1;
                return count;
              })
            }
          >
            <FaAngleDown className="text-sm"></FaAngleDown>
            Extend
          </span>
        )}
        {count > 1 && (
          <span
            className="p-1 cursor-pointer flex gap-1 items-center font-semibold border border-gray-300 rounded-md hover:bg-green-500 text-sm"
            onClick={() =>
              setCount((count) => {
                if (count > 1) return count - 1;
                return count;
              })
            }
          >
            <FaAngleUp className="text-sm"></FaAngleUp>
            Collapse
          </span>
        )}
      </div>
      {/* price filter */}
      <div className="mt-5 border-t-2 pt-2">
        <div className="flex items-center gap-2 justify-center font-semibold text-lg border-b-2 pb-2">
          <FaFilter className="text-gray-500"></FaFilter> Search Filters
        </div>
        <div className="my-2 ">Price range</div>
        <div className="flex items-center">
          <input
            type="number"
            className="w-[75px] pl-2 border-[1.5px] rounded-md border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none h-8 leading-4"
            min={0}
            placeholder="₫ From"
            ref={lowRef}
            onChange={(e) => setLowPrice(e.target.value)}
          />
          <hr className="flex-1 h-[2.5px] bg-gray-400 mx-2 z-10" />
          <input
            type="number"
            className="w-[75px] pl-2 border-[1.5px] rounded-md border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none h-8 leading-4"
            min={0}
            ref={highRef}
            placeholder="₫ To"
            onChange={(e) => setHighPrice(e.target.value)}
          />
        </div>
        <div className="flex justify-evenly mt-2">
          <button
            className="px-3 py-1 border border-gray-400 hover:bg-green-500 rounded-md"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="px-3 py-1 border border-gray-400 hover:bg-green-500 rounded-md"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

SidebarFilter.propTypes = {
  setUrl: PropTypes.func,
  url: PropTypes.string,
  setpage: PropTypes.func,
};

export default SidebarFilter;
