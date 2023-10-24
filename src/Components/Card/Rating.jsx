import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const Rating = ({ rate }) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        {[...Array(5)].map((_, index) => {
          if (index + 1 <= rate)
            return (
              <div className="inline-block" key={index}>
                <FaStar className="text-lg text-yellow-400 inline-block"></FaStar>
              </div>
            );
          else if (index - rate + 1 < 1 && index - rate + 1 > 0)
            return (
              <div className="inline-block" key={index}>
                <FaStarHalfAlt className="text-lg text-yellow-400 inline-block"></FaStarHalfAlt>
              </div>
            );
          else
            return (
              <div className="inline-block" key={index}>
                <FaRegStar className="text-lg text-gray-400 inline-block"></FaRegStar>
              </div>
            );
        })}
      </div>
      <span className="inline-block text-sm font-bold text-gray-500">
        {rate || 0}
      </span>
    </div>
  );
};

Rating.propTypes = {
  rate: PropTypes.number,
};

export default Rating;
