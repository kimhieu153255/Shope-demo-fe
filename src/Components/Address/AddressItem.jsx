import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addMessage, removeMessage } from "../../redux-toolkit/MessageSlice";
import tokenAxiosInstance from "../../Axios/Token.a";

const AddressItem = ({
  addressId,
  setIsChange,
  username,
  phone,
  address,
  isDefault,
}) => {
  const dispatch = useDispatch();
  const funcDeleteAddress = async () => {
    try {
      const res = await tokenAxiosInstance.delete(
        `/address/api/delete?addressId=${addressId}`
      );
      if (res.data) {
        dispatch(addMessage(res.data.message));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 1000);
        setIsChange((prev) => !prev);
      } else console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(addMessage("Something went wrong!"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 1000);
    }
  };

  const funcSetDefaultAddress = async () => {
    try {
      const res = await tokenAxiosInstance.put(
        `/address/api/set-default?addressId=${addressId}`
      );

      if (res.data) {
        dispatch(addMessage(res.data.message));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 1000);
        setIsChange((prev) => !prev);
      } else console.log(res.data);
    } catch (err) {
      console.log(err);
      dispatch(addMessage("Something went wrong!"));
      setTimeout(() => {
        dispatch(removeMessage());
      }, 1000);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex-col items-center">
        <div className="flex gap-2 items-center">
          <div className="font-bold">{username}</div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400">{phone}</div>
        </div>
        <div className="text-base text-gray-400 break-words w-96 line-clamp-2 overflow-hidden">
          {address}
        </div>
        {isDefault && (
          <span className="text-sm text-green-500 border border-green-500 px-3 py-0.5 rounded-md">
            Default
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 text-white">
        <button
          className="px-3 py-1.5 bg-red-500 rounded-md hover:bg-red-600 transition-all"
          onClick={() => funcDeleteAddress()}
        >
          Delete
        </button>
        <button
          className="px-3 py-1.5 bg-green-500 rounded-md hover:bg-green-600 transition-all"
          onClick={() => funcSetDefaultAddress()}
        >
          Set Default
        </button>
      </div>
    </div>
  );
};

AddressItem.propTypes = {
  addressId: propTypes.string,
  setIsChange: propTypes.func,
  username: propTypes.string,
  phone: propTypes.string,
  address: propTypes.string,
  isDefault: propTypes.bool,
};

export default AddressItem;
