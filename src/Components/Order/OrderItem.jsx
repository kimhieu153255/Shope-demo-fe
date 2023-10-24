import PropTypes from "prop-types";

const OrderItem = ({ item }) => {
  console.log(item);
  return (
    <div className="box bg-gray-100 border rounded-md p-5 mb-2">
      <div className="topTitle flex justify-between pb-5 pl-2 pr-2 border-b-2">
        <div className=" flex gap-2 items-center">
          <span className="font-semibold text-lg">{item._id}</span>
          <span className="border border-green-500 rounded-md px-2 hover:bg-green-500 hover:border-green-600">
            View Shop
          </span>
        </div>
        <span className="text-lg font-semibold text-green-500">
          {item.state}
        </span>
      </div>
      {item?.productOrderArr?.map((product, ind) => (
        <div
          className="item flex items-center gap-5 justify-between mb-2 pl-2 pr-2 border-b-2 py-5 cursor-pointer"
          key={ind}
          onClick={() => {
            window.location.href = `/product/${product.productId}`;
          }}
        >
          <div className="flex gap-3">
            <div className="w-20 h-20">
              <img
                src={product?.imgSrc || "https://picsum.photos/200/300"}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="xl:w-[600px] lg:w-[400px] md:w-[300px] line-clamp-2 font-semibold">
                {product?.name || "Product name"}
              </div>
              <div className="text-gray-500">
                Product classification: {product?.color}{" "}
                {product?.color && ", "} {product?.size}
              </div>
              <div>x {product?.quantity || 0}</div>
            </div>
          </div>
          <div className="font-semibold">
            VND <span>{(product?.price || 1) * (product?.quantity || 0)}</span>
          </div>
        </div>
      ))}
      <div
        className={`flex ${
          item?.state === "pending" ? "justify-between" : "justify-end"
        } pt-10 pb-5 gap-5 pr-2 text-lg`}
      >
        {item?.state === "pending" && (
          <button className="border border-green-500 rounded-md px-2 hover:bg-green-500 hover:border-green-600 font-semibold">
            Refund
          </button>
        )}
        <div className="flex items-center gap-3">
          <div className="font-semibold">Total:</div>
          <div className="font-semibold text-green-500">
            VND {item.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
};

export default OrderItem;
