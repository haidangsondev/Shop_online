import { UserSlider } from "components";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";

function UserLayout() {
  const { isLogin, current } = useSelector((state) => state.user);
  if (!isLogin || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full   min-h-screen relative ">
      <div className="w-[250px] flex-none text-white fixed top-0 bottom-0">
        <UserSlider />
      </div>
      <div className="w-[250px]"></div>
      <div className="flex-auto w-[750px]">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
