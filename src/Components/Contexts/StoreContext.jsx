import { createContext, useState } from "react";

// const cardList1 = [
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo thun nam1",
//     events: ["holiday", "sale"],
//     cost: 1100000,
//     rate: 4.5,
//     num: 100,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Quần jean nam",
//     events: ["holiday", "sale"],
//     cost: 1200000,
//     rate: 4.5,
//     num: 10,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Quần kaki nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 4.1,
//     num: 90,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 102000,
//     rate: 5,
//     num: 101,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 3,
//     num: 100,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 1,
//     num: 100,
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     rate: "2.5",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     rate: 4.5,
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     rate: 3,
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     rate: 3.5,
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: "1000000",
//     num: "100",
//   },
// ];

// const cardList2 = [
//   {
//     imgSrc: "/avatar.avif",
//     title: "Áo thun nam2",
//     events: ["holiday", "sale"],
//     cost: 1100000,
//     rate: 5,
//     num: 100,
//     createdAt: "2021-09-01T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Quần jean nam",
//     events: ["holiday", "sale"],
//     cost: 1200000,
//     rate: 4.5,
//     num: 10,
//     createdAt: "2021-09-02T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Quần kaki nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 4.1,
//     num: 90,
//     createdAt: "2021-09-03T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 102000,
//     rate: 5,
//     num: 101,
//     createdAt: "2021-09-04T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 600000,
//     rate: 3,
//     num: 100,
//     createdAt: "2021-09-05T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1100000,
//     rate: 2.1,
//     num: 100,
//     createdAt: "2021-09-06T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1300000,
//     rate: 2.5,
//     num: 100,
//     createdAt: "2021-09-07T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 4.5,
//     num: 81,
//     createdAt: "2021-09-08T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 3,
//     num: 101,
//     createdAt: "2021-09-09T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1010000,
//     rate: 3.5,
//     num: 100,
//     createdAt: "2021-09-10T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 200000,
//     rate: 4.5,
//     num: 100,
//     createdAt: "2021-09-11T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 600000,
//     rate: 4.5,
//     num: 54,
//     createdAt: "2021-09-12T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 650000,
//     rate: 4.5,
//     num: 121,
//     createdAt: "2021-09-13T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 4.1,
//     num: 100,
//     createdAt: "2021-09-14T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 2.5,
//     num: 12,
//     createdAt: "2021-09-15T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 400000,
//     rate: 4.5,
//     num: 100,
//     createdAt: "2021-09-16T00:00:00.000Z",
//   },
//   {
//     imgSrc: "https://picsum.photos/200/300",
//     title: "Áo khoác nam",
//     events: ["holiday", "sale"],
//     cost: 1000000,
//     rate: 4.5,
//     num: 87,
//     createdAt: "2021-09-17T00:00:00.000Z",
//   },
// ];

const StoreContext = createContext();
const StoreProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [storeId, setStoreId] = useState();

  const LoadPage = (page) => {
    if (products.length === 0) return [];
    let arr = [];
    for (let i = (page - 1) * 14; i < page * 14; i++) {
      if (i < products.length) arr.push(products[i]);
    }
    return arr;
  };

  const loadStore = (id) => {
    setStoreId(id);
  };

  const SortByPrice = (isAsc) => {
    const temp = [...products];
    if (isAsc) {
      temp.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      temp.sort((a, b) => {
        return b.price - a.price;
      });
    }
    setProducts(temp);
  };

  const SortBySold = (isAsc) => {
    const temp = [...products];
    if (isAsc) {
      temp.sort((a, b) => {
        return a.num - b.num;
      });
    } else {
      temp.sort((a, b) => {
        return b.num - a.num;
      });
    }
    setProducts(temp);
  };

  const SortByRate = (isDesc) => {
    const temp = [...products];
    if (isDesc) {
      temp.sort((a, b) => {
        return b.rate - a.rate;
      });
    } else {
      temp.sort((a, b) => {
        return a.rate - b.rate;
      });
    }
    setProducts(temp);
  };

  const SortByCreatedAt = (isDesc) => {
    const temp = [...products];
    if (isDesc) {
      temp.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else {
      temp.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    setProducts(temp);
  };

  const value = {
    products,
    setProducts,
    categories,
    setCategories,
    page,
    setPage,
    total,
    setTotal,
    storeId,
    setStoreId,
    loadStore,
    LoadPage,
    SortByPrice,
    SortBySold,
    SortByRate,
    SortByCreatedAt,
  };
  return (
    <StoreContext.Provider value={value} {...props}></StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
