import axios from "axios";
import Banner from "../Components/Banner/Banner";
import SwiperCard from "../Components/Card/SwiperCard";
import CategoryList from "../Components/Category/CategoryList";
import { useEffect, useState } from "react";

const Home = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const LoadPopularProduct = async () => {
    const url =
      "https://shop-demo1.onrender.com/product/api/getPopularProducts";
    try {
      const res = await axios.get(url, {
        params: { limit: 10 },
      });
      if (res.data) {
        setPopularProduct(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LoadNewProduct = async () => {
    const url = "https://shop-demo1.onrender.com/product/api/getNewProducts";
    try {
      const res = await axios.get(url, {
        params: { limit: 10 },
      });
      if (res.data) {
        console.log(res.data.data);
        setNewProduct(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LoadPopularProduct();
    LoadNewProduct();
  }, []);

  return (
    <div className="Home max-w-[1000px] w-[750px] lg:w-[1000px] md:w-[700px]  mx-auto bg-white py-2">
      <Banner></Banner>
      <div className="mt-5 p-2 border bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-xl mb-3 inline-block ml-5">
            Category
          </span>
          <button className="bg-gray-200 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 mr-5">
            See all
          </button>
        </div>
        <CategoryList></CategoryList>
      </div>

      <div className="mt-5 p-2 border bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-xl mb-3 inline-block ml-5">
            Popularity
          </span>
          <button className="bg-gray-200 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 mr-5">
            See all
          </button>
        </div>
        <SwiperCard list={popularProduct}></SwiperCard>
      </div>

      <div className="mt-5 p-2 border bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-xl mb-3 inline-block ml-5">
            New Product
          </span>
          <button className="bg-gray-200 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 mr-5">
            See all
          </button>
        </div>
        <SwiperCard list={newProduct}></SwiperCard>
      </div>
    </div>
  );
};

export default Home;
