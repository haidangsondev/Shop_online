import { createRatings, formatMoney } from "utils/helper";
import SelectOption from "../Other/SelectOption";
import icons from "utils/icons";
import { memo, useState } from "react";
import WithBase from "hoc/withBase";
import { useSelector } from "react-redux";
import path from "utils/path";
import Swal from "sweetalert2";
import { apiAddCart, apiUpdateWishlist } from "apis";
import { toast } from "react-toastify";
import { getUser } from "redux/reduxActions/userAction";

const { FaHeart, IoMenu, FaShoppingCart } = icons;
function Product({ data, navigate, dispatch }) {
  const [isOption, setIsOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const handleSubmitOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === "MENU") {
      navigate(`/${data?.category}/${data?._id}/${data?.title}`);
    }
    if (flag === "CART") {
      if (!current) {
        Swal.fire({
          title: "Đăng nhập",
          text: "Bạn cần tiến hành đăng nhập!",
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate(`/${path.LOGIN}`);
          }
        });
      }
      const response = await apiAddCart({
        product_id: data._id,
        color: data?.color,
        price: data?.price,
        thumb: data?.thumb,
        title: data?.title,
      });
      if (response?.success) {
        toast.success(response.message);
        dispatch(getUser());
      } else {
        toast.error(response.message);
      }
    }
    if (flag === "HEART") {
      const response = await apiUpdateWishlist(data._id);
      if (response?.success) {
        dispatch(getUser());
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="px-[15px]">
      <div
        onClick={() =>
          navigate(
            `/${data?.category?.toLowerCase()}/${data?._id}/${data?.title}`
          )
        }
        className="w-full mt-[20px] flex flex-col border border-gray-400 p-[15px]  items-center "
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsOption(false);
        }}
      >
        <div className="relative mb-2">
          {isOption && (
            <div className="absolute flex gap-2 bottom-[-1.25rem] right-0 left-0 justify-center animate-slide-top">
              <span onClick={(e) => handleSubmitOption(e, "HEART")}>
                <SelectOption
                  icon={
                    <FaHeart
                      color={
                        current?.wishlist?.some((item) => item._id === data._id)
                          ? "red"
                          : ""
                      }
                    />
                  }
                />
              </span>
              <span onClick={(e) => handleSubmitOption(e, "MENU")}>
                <SelectOption icon={<IoMenu />} />
              </span>
              {current?.cart?.some(
                (item) => item.product === data._id.toString()
              ) ? (
                <span onClick={(e) => handleSubmitOption(e, "CART")}>
                  <SelectOption icon={<FaShoppingCart color="red" />} />
                </span>
              ) : (
                <span onClick={(e) => handleSubmitOption(e, "CART")}>
                  <SelectOption icon={<FaShoppingCart />} />
                </span>
              )}
            </div>
          )}
          <img
            src={data?.thumb}
            className="w-[274px] h-[274px] object-cover"
            alt="product"
          />
        </div>
        <div className="flex gap-1 w-full flex-col mt-[15px] items-start">
          <span className="line-clamp-1">{data?.title}</span>
          <span>{`${formatMoney(data?.price)} VND`}</span>
          <span className="flex h-4">
            {" "}
            {createRatings(data?.totalRatings, 20)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WithBase(memo(Product));
