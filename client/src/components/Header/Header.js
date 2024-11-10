import { Link } from "react-router-dom";
import logo from "img/image.png";
import icons from "utils/icons";
import path from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { logout } from "redux/reduxSlice/userSlice";
import WithBase from "hoc/withBase";
import { showCart } from "redux/reduxSlice/productCategoriesSlice";
const { FaPhoneAlt, MdEmail, FaShoppingBag, FaRegUserCircle } = icons;

function Header({ dispatch }) {
  const { current } = useSelector((state) => state.user);
  const [isShowOptin, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickOutOption = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickOutOption);
    return () => {
      document.removeEventListener("click", handleClickOutOption);
    };
  }, []);
  return (
    <div className=" w-main h-[110px] py-[35px] flex justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="Logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <FaPhoneAlt color="main" />
            <span className="font-semibold ">(+1800) 000 8808</span>
          </span>
          <span>Thứ 6 đến 7: 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="main" />
            <span className="font-semibold ">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Hỗ trợ online 24/7</span>
        </div>
        {current && (
          <>
            <div
              onClick={() => dispatch(showCart())}
              className="flex justify-center items-center gap-4 px-6 border-r "
            >
              <FaShoppingBag color="main" />
              <span>{`(${current?.cart.length || 0}) sản phẩm`}</span>
            </div>
            <div
              id="profile"
              onClick={() => setIsShowOption(!isShowOptin)}
              className="flex justify-center items-center px-6 gap-2 cursor-pointer  relative"
            >
              <FaRegUserCircle size={24} color="main" />
              <span>Hồ sơ</span>
              {isShowOptin && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full flex flex-col left-[16px] bg-main border w-[150px] text-white"
                >
                  <Link
                    className="p-2 w-full hover:bg-white hover:text-main"
                    to={`/${path.USER}/${path.PROFILE}`}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  {+current.role === 2000 && (
                    <Link
                      to={`${path.ADMIN}/${path.DASBOARD}`}
                      className="p-2 w-full hover:bg-white hover:text-main"
                    >
                      Quản trị viên
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 w-full hover:bg-white hover:text-main"
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WithBase(memo(Header));
