import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import List from "./List";
import tokenAxiosInstance from "../../Axios/Token.a";

const CardList = ({ storeId, url, page, setTotalPage }) => {
  console.log("vào CardList");
  console.log("url", url);
  const [data, setData] = useState([]);

  const getAllProducts = async (token, page) => {
    try {
      const response = await tokenAxiosInstance.get(
        `/product/api/getAllProductsByStoreId${url}`,
        {
          params: { storeId, page },
        }
      );
      if (response.data) {
        console.log("response", response.data);
        setTotalPage(response.data?.totalPage);
        setData(response.data?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const funcRef = useRef();
  funcRef.current = getAllProducts;

  useEffect(() => {
    funcRef.current(Cookies.get("token"), page);
  }, [page, storeId, url]);

  return <List list={data}></List>;
};

CardList.propTypes = {
  storeId: PropTypes.string,
  url: PropTypes.string,
  page: PropTypes.number,
  totalPage: PropTypes.number,
  setTotalPage: PropTypes.func,
};

export default CardList;
