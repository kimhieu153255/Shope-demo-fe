import { useParams } from "react-router-dom";
import List from "./List";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const MainList = ({ url, page, setTotalPage }) => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const funcGetProductByCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:20474/product/api/getProductByCategory${url}`,
        {
          params: { category, page },
        }
      );
      if (res.data) {
        console.log(res.data);
        setTotalPage(res.data.totalPage);
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const funcRef = useRef();
  funcRef.current = funcGetProductByCategory;

  useEffect(() => {
    funcRef.current();
    console.log(url);
  }, [page, category, url]);

  return <List list={data}></List>;
};

MainList.propTypes = {
  url: PropTypes.string,
  page: PropTypes.number,
  setTotalPage: PropTypes.func,
  category: PropTypes.string,
};

export default MainList;
