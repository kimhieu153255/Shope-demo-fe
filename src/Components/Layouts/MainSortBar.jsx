import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  FaCaretLeft,
  FaCaretRight,
  FaChevronDown,
  FaSortAmountDown,
  FaSortAmountUpAlt,
} from "react-icons/fa";

const MainSortBar = ({ setUrl, url, page, setPage, totalPage }) => {
  const [state, setState] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const caretRef = useRef();
  const DropRef = useRef();

  useEffect(() => {
    if (!url.includes("sort")) setState("");
  }, [url]);

  const handleSort = (type) => {
    if (url.includes("?")) {
      url.includes("sort") &&
        setUrl(
          url.replace(
            /sort=(Low-to-high|High-to-low|lastest|rate|soldCount)/,
            `sort=${type}`
          )
        );
      !url.includes("sort") && setUrl(url + `&sort=${type}`);
    } else setUrl((url) => url + `?sort=${type}`);
  };

  return (
    <div className="flex justify-between min-w-max w-full h-fit items-center bg-gray-200 px-10 rounded-md font-semibold py-2 gap-5">
      <div className="flex gap-4">
        <span className="py-1 cu">Sort by:</span>
        <span
          className={
            "hover:bg-green-500 hover:text-white px-2 py-1 border bg-gray-100 rounded-md cursor-pointer " +
            (state === "Popularity" ? "bg-green-500 text-white" : "")
          }
          onClick={() => {
            setState("Popularity");
            handleSort("soldCount");
          }}
        >
          Popularity
        </span>
        <span
          className={
            "hover:bg-green-500 hover:text-white px-2 py-1 border bg-gray-100 rounded-md cursor-pointer " +
            (state === "lastest" ? "bg-green-500 text-white" : "")
          }
          onClick={() => {
            setState("lastest");
            handleSort("lastest");
          }}
        >
          Lastest
        </span>
        <span
          className={
            "hover:bg-green-500 hover:text-white p-1 border bg-gray-100 rounded-md cursor-pointer " +
            (state === "rate" ? "bg-green-500 text-white" : "")
          }
          onClick={() => {
            setState("rate");
            handleSort("rate");
          }}
        >
          top rating
        </span>
        <div
          onMouseOver={() => {
            setIsDropdown(true);
            caretRef.current.classList.add("rotate-180");
          }}
          onMouseLeave={() => {
            setIsDropdown(false);
            caretRef.current.classList.remove("rotate-180");
          }}
        >
          <div
            className={
              "flex justify-between items-center gap-2 hover:bg-green-500 hover:text-white border bg-gray-100 rounded-md px-2 py-1 cursor-pointer lg:w-44 w-30  " +
              (state === "Low to high" || state === "High to low"
                ? "bg-green-500 text-white"
                : "")
            }
          >
            <span>
              Price
              {state === "Low to high"
                ? ": Low to high"
                : state === "High to low"
                ? ": High to low"
                : ""}
            </span>
            <div ref={caretRef} className="duration-300">
              <FaChevronDown></FaChevronDown>
            </div>
          </div>
          {isDropdown && (
            <div
              className="absolute px-4 py-2 border rounded-md bg-gray-100 flex flex-col lg:w-44 w-30 "
              ref={DropRef}
            >
              <span
                className="hover:text-green-500 cursor-pointer min-w-max"
                onClick={() => {
                  setState("Low to high");
                  handleSort("Low-to-high");
                }}
              >
                <FaSortAmountUpAlt className="inline-block mr-3"></FaSortAmountUpAlt>
                Low to high
              </span>
              <span
                className="hover:text-green-500 cursor-pointer"
                onClick={() => {
                  setState("High to low");
                  handleSort("High-to-low");
                }}
              >
                <FaSortAmountDown className="inline-block mr-3"></FaSortAmountDown>
                High to low
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center text-lg">
        <button
          className="px-2 py-1 border bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 hover:text-white"
          onClick={() => {
            page > 1 && setPage(page - 1);
          }}
        >
          <FaCaretLeft></FaCaretLeft>
        </button>
        <span className="px-2 text-base">
          {page || 0}/{totalPage || 0}
        </span>
        <button
          className="px-2 py-1 border bg-gray-100 rounded-md cursor-pointer hover:bg-green-500 hover:text-white"
          onClick={() => {
            page < totalPage && setPage(page + 1);
          }}
        >
          <FaCaretRight></FaCaretRight>
        </button>
      </div>
    </div>
  );
};

MainSortBar.propTypes = {
  setUrl: PropTypes.func,
  url: PropTypes.string,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPage: PropTypes.number,
};

export default MainSortBar;
