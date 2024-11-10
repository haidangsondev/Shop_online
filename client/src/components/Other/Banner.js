import banner from "img/banner1.jpg";
import { memo } from "react";
function Banner() {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="banner"
        className="h-[360px] w-full object-cover"
      />
    </div>
  );
}

export default memo(Banner);
