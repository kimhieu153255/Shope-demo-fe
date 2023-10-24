import { createContext, useState } from "react";

const ShopContext = createContext();
const ShopProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const [page, setPage] = useState(props.page ? props.page : 1);
  // eslint-disable-next-line react/prop-types
  const [total, setTotal] = useState(props.total ? props.total : 1);

  const value = {
    page,
    setPage,
    total,
    setTotal,
  };
  return <ShopContext.Provider value={value} {...props}></ShopContext.Provider>;
};

export { ShopProvider, ShopContext };
