import { memo } from "react";
import Slider from "react-slick";
import { Product } from "components";
function CustomSlider({ products }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div>
      {products && (
        <Slider {...settings}>
          {products?.map((item) => (
            <Product key={item._id} data={item} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default memo(CustomSlider);
