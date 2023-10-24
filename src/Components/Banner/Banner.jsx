import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerItem from "./BannerItem";

const Banner = () => {
  return (
    <div className="banners h-[350px] bg-gray-700 max-w-[1000px] lg:w-[1000px] md:w-[700px] mx-auto rounded-lg overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        emulateTouch={true}
      >
        {new Array(7).fill(0).map((item, index) => (
          <BannerItem key={index}></BannerItem>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
