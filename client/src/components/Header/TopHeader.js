import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux";
import icons from "utils/icons";
import { clearMessage, logout } from "redux/reduxSlice/userSlice";
import Swal from "sweetalert2";
import WithBase from "hoc/withBase";
import { getUser } from "redux/reduxActions/userAction";

const { IoLogOutSharp } = icons;

function TopHeader({ navigate, dispatch }) {
  const { isLogin, current, message } = useSelector((state) => state.user);
  useEffect(() => {
    const id = setTimeout(() => {
      if (isLogin) dispatch(getUser());
    }, 3000);
    return () => clearTimeout(id);
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (message) {
      Swal.fire("Thông báo", message, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center  justify-end text-xs text-white">
        {isLogin && current ? (
          <div className="flex items-center gap-3 text-sm">
            <span>Chào mừng {current?.email}</span>
            <span
              className="hover:text-red-300"
              onClick={() => dispatch(logout())}
            >
              <IoLogOutSharp size={26} />
            </span>
          </div>
        ) : (
          <Link to={`/${path.LOGIN}`} className="hover:text-red-100">
            Đăng nhập hoặc Đăng ký
          </Link>
        )}
      </div>
    </div>
  );
}
export default WithBase(memo(TopHeader));
