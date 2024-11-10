import { Fragment, memo, useState } from "react";
import { sliderDasboardUser } from "utils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import icons from "utils/icons";
import { useSelector } from "react-redux";
import avatar from "img/userDefault.png";
import path from "utils/path";
const { RiArrowGoForwardFill } = icons;
const isActionActive = "px-4 py-2 flex items-center gap-2  bg-white text-main";
const isNotActionActive =
  "px-4 py-2 flex items-center gap-2  hover:bg-white hover:text-main";

function UserSlider() {
  const [isShow, setIsShow] = useState(false);
  const { current } = useSelector((state) => state.user);

  return (
    <div className="py-4 bg-main  h-full">
      <div className="w-full flex flex-col justify-center items-center py-4 gap-2">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-20 h-20 object-cover  p-3 rounded-full"
        />
        <span>{current?.email || "Anynomus"}</span>
      </div>
      <div>
        {sliderDasboardUser.map((item) => (
          <Fragment key={item.id}>
            {item.type === "SINGLE" && (
              <NavLink
                onClick={() => setIsShow(!isShow)}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    isActive && isActionActive,
                    !isActive && isNotActionActive
                  )
                }
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>
            )}
          </Fragment>
        ))}
      </div>
      <Link to={`/${path.HOME}`} className={clsx(isNotActionActive)}>
        <RiArrowGoForwardFill /> Về trang chủ
      </Link>
    </div>
  );
}

export default memo(UserSlider);
