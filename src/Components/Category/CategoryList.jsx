import { Swiper, SwiperSlide } from "swiper/react";
import CategoryItem from "./CategoryItem";
import { CategoryArr } from "../../helpers/data";
import "swiper/css";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryList = () => {
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
        breakpoints={{
          400: {
            slidesPerView: 3,
          },
          720: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
        }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachBeginning={handleSlideChangeTransitionEnd}
        onReachEnd={handleSlideChangeTransitionEnd}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        className="py-3 px-2"
      >
        {CategoryArr.map((item, ind) => (
          <SwiperSlide key={ind}>
            <CategoryItem name={item.name} img={item.img} />
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

export default CategoryList;
