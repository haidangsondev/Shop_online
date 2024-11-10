import { NavLink } from "react-router-dom";
import { formatCreateSlug } from "utils/helper";
import { useSelector } from "react-redux";
import { memo } from "react";

function Slider() {
  const categories = useSelector((state) => state.app);

  return (
    <div className="flex flex-col border">
      {categories?.productCategories?.map((item) => (
        <NavLink
          key={item._id}
          to={formatCreateSlug(item.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main "
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main "
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

export default memo(Slider);
