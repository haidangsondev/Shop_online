import { Fragment, memo, useState } from "react";
import logo from "img/image.png";
import { sliderDasboard } from "utils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import icons from "utils/icons";

const { FaAngleDown } = icons;
const isActionActive =
  "px-4 py-2 flex items-center gap-2  bg-white text-gray-700";
const isNotActionActive =
  "px-4 py-2 flex items-center gap-2  hover:bg-white hover:text-gray-700";
function AdminSlider() {
  const [show, setShow] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleClickShow = (id) => {
    if (show.some((item) => item === id)) {
      setShow((pre) => pre.filter((item) => item !== id));
    } else {
      setShow((pre) => [...pre, id]);
    }
  };

  return (
    <div className="py-4 bg-gray-700  h-full">
      <Link
        to={"/"}
        className="flex flex-col justify-center items-center py-4 gap-2"
      >
        <img
          src={logo}
          alt="logo"
          className="w-[200px] object-contain bg-slate-100 p-3"
        />
        <span>Admin</span>
      </Link>
      <div>
        {sliderDasboard.map((item) => (
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
            {item.type === "PARENT" && (
              <div
                onClick={() => handleClickShow(+item.id)}
                className=" flex flex-col  text-gray-200 "
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white hover:text-gray-700">
                  <div className="flex items-center gap-2 ">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                  <FaAngleDown />
                </div>
                {show.some((check) => +check === +item.id) && (
                  <div className="flex flex-col ">
                    {item.submenu.map((element) => (
                      <NavLink
                        onClick={(e) => e.stopPropagation()}
                        to={element.path}
                        key={item.text}
                        className={({ isActive }) =>
                          clsx(
                            isActive && isActionActive,
                            !isActive && isNotActionActive,
                            "pl-10"
                          )
                        }
                      >
                        {element.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default memo(AdminSlider);
