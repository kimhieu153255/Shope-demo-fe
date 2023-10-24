import { useEffect, useRef, useState } from "react";
import AddressItem from "./AddressItem";
import Cookies from "js-cookie";
import propTypes from "prop-types";
import tokenAxiosInstance from "../../Axios/Token.a";

const AddressList = ({ isHidden }) => {
  const [data, setData] = useState([]);
  const user = JSON.parse(Cookies.get("user")?.toString() || null);
  const [isChange, setIsChange] = useState(false);

  const funcGetAddressList = async () => {
    try {
      const res = await tokenAxiosInstance.get(
        `/address/api/get?userId=${user._id}`
      );
      if (res.data) {
        console.log(res.data.data);
        setData(res.data.data);
      } else setData([]);
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };
  const funcRef = useRef();
  funcRef.current = funcGetAddressList;

  useEffect(() => {
    if (isHidden) funcRef.current();
  }, [isHidden, isChange]);

  return (
    <div>
      <h1 className="font-bold text-xl mb-5">Address</h1>
      {data && (
        <div className="flex flex-col">
          {data.map((item, index) => (
            <div key={index}>
              {index > 0 && (
                <hr className="flex-1 h-[1.5px] bg-gray-200 z-10 my-3"></hr>
              )}
              <AddressItem
                addressId={item._id}
                setIsChange={setIsChange}
                username={item.name}
                phone={item.phone}
                address={`${item.specific} - ${item.ward} - ${item.district} - ${item.province}`}
                isDefault={item.isDefault}
              ></AddressItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

AddressList.propTypes = {
  isHidden: propTypes.bool,
};

export default AddressList;
