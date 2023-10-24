import PropTypes from "prop-types";
import Card from "./Card";

const List = ({ list }) => {
  return (
    <div className="grid gap-2 grid-cols-4 py-2 xl:grid-cols-5">
      {list?.map((el, ind) => (
        <Card
          key={ind}
          id={el._id}
          imgSrc={el.imgSrc}
          title={el.name}
          events={el.events}
          cost={el.price}
          num={el.soldCount}
          rate={el.rate}
        ></Card>
      ))}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.array,
};

export default List;
