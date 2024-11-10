import { Product } from "components";
import { memo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "img/image.png";
import wishlistEmpty from "img/wishlistempty.webp";

function WishList() {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full relative px-4">
      {current?.wishlist.length === 0 && (
        <div className="w-[750px] h-full justify-center items-center mt-[100px] ml-[100px]  flex flex-col  ">
          <img
            src={wishlistEmpty}
            alt="wishlist empty"
            className="w-[220px] h-[220px] object-cover opacity-65"
          />{" "}
          <div className="text-2xl font-medium text-gray-700">
            Không có sản phẩm nào được yêu thích!!
          </div>
        </div>
      )}
      {current?.wishlist?.length !== 0 && (
        <>
          <NavLink
            to={"/"}
            className="h-[75px] flex justify-center items-center text-3xl font-bold py-4 "
          >
            <img src={logo} alt="log" className="w-17 h17 object-cover" />
          </NavLink>
          <div className="p-4 w-full grid grid-cols-4 gap-4">
            {current?.wishlist?.map((item) => (
              <div key={item._id}>
                <Product data={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(WishList);
