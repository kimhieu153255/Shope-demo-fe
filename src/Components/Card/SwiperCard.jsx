import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "./Card";
import PropTypes from "prop-types";

const SwiperCard = ({ list }) => {
  const swiperRef = useRef();
  const btnEndRef = useRef();
  const btnStartRef = useRef();

  const handleNextSlide = () => {
    if (swiperRef.current) {
      const slidesToJump = 3;
      for (let i = 0; i < slidesToJump; i++) {
        swiperRef.current.slideNext();
      }
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      const slidesToJump = 3;
      for (let i = 0; i < slidesToJump; i++) {
        swiperRef.current.slidePrev();
      }
    }
  };

  const handleSlideChangeTransitionEnd = () => {
    if (!swiperRef.current) return;
    const isEnd = swiperRef.current.isEnd;
    const isBeginning = swiperRef.current.isBeginning;
    isEnd
      ? btnEndRef.current.classList.add("hidden")
      : btnEndRef.current.classList.remove("hidden");
    isBeginning
      ? btnStartRef.current.classList.add("hidden")
      : btnStartRef.current.classList.remove("hidden");
  };

  return (
    <div className="relative">
      <Swiper
        grabCursor={true}
        slidesPerView={5}
        pagination={{
          clickable: true,
        }}
        spaceBetween={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachBeginning={handleSlideChangeTransitionEnd}
        onReachEnd={handleSlideChangeTransitionEnd}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        className="pt-2 pb-[52px] px-2"
      >
        {list &&
          list.map((item, ind) => (
            <SwiperSlide key={ind}>
              <Card
                key={ind}
                id={item._id}
                imgSrc={item.imgSrc}
                title={item.name}
                events={item.events}
                cost={item.price}
                num={item.soldCount}
                rate={item.rate}
              ></Card>
            </SwiperSlide>
          ))}
        <button
          onClick={handlePrevSlide}
          className="text-center absolute left-0 top-1/2 z-10 rounded-full shadow-lg hover:scale-125 hover:text-gray-500 transform transition-all duration-200 ease-in-out bg-gray-50 p-1 text-gray-400 hidden"
          ref={btnStartRef}
        >
          <FaChevronLeft className="text-xl pr-1" />
        </button>
        <button
          onClick={handleNextSlide}
          className={`text-center absolute right-0 top-1/2 z-10 rounded-full shadow-lg hover:scale-125 hover:text-gray-500 transform transition-all duration-300 ease-in-out bg-gray-50 p-1 text-gray-400`}
          ref={btnEndRef}
        >
          <FaChevronRight className="text-xl pl-1 " />
        </button>
      </Swiper>
    </div>
  );
};

SwiperCard.propTypes = {
  list: PropTypes.array,
};

export default SwiperCard;
