import { FaPlus } from "react-icons/fa";
import AddressList from "../Address/AddressList";
import AddAddress from "../Address/AddAddress";
import { useState } from "react";

const Address = () => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="mx-auto border w-full h-full bg-gray-100 rounded-md">
      <div className="flex justify-between m-3 border-b-2 pb-3 items-center">
        <h2 className="font-bold text-xl">My Address</h2>
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-green-500 rounded-md text-white hover:bg-green-600 transition-all"
          onClick={() => {
            setIsHidden(false);
          }}
        >
          <FaPlus />
          Add new Address
        </button>
      </div>
      <div className="m-3">
        <AddressList isHidden={isHidden}/>
      </div>
      <AddAddress isHidden={isHidden} setIsHidden={setIsHidden}></AddAddress>
    </div>
  );
};

export default Address;
