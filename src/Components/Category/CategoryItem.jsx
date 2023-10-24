import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ name, img }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-2 text-center inline-block font-semibold text-md border rounded-lg bg-gray-200 ring-gray-300 ring-0 shadow-sm cursor-pointer hover:border-green-500 hover:scale-105 transition-all"
      onClick={() => navigate(`/category/${name}`)}
    >
      <img src={img} alt="a" className="w-40 h-40 object-cover" />
      <span>{name}</span>
    </div>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
};

export default CategoryItem;
