import { useSelector } from "react-redux";
import { memo } from "react";
import { CustomSlider } from "components";
function NewArrival() {
  const { newProducts } = useSelector((state) => state.products);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        NEW ARRIVALS
      </h3>
      <div className="w-full">
        <CustomSlider products={newProducts} />
      </div>
    </div>
  );
}

export default memo(NewArrival);
