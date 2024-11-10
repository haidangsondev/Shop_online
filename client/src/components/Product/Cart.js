import { apiDeleteCart } from "apis";
import Button from "components/Button/Button";
import WithBase from "hoc/withBase";
import { memo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser } from "redux/reduxActions/userAction";
import { showCart } from "redux/reduxSlice/productCategoriesSlice";
import { formatMoney } from "utils/helper";
import icons from "utils/icons";
import path from "utils/path";
import orderEmpty from "img/orderEmpty.jpg";
const { IoCloseCircleSharp, RiDeleteBin2Fill } = icons;

function Cart({ dispatch, navigate }) {
  const { currentCart } = useSelector((state) => state.user);
  const deleteCart = async (product_id) => {
    const response = await apiDeleteCart(product_id);
    if (response?.success) {
      dispatch(getUser());
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="grid grid-rows-10 w-[500px] max-h-screen overflow-y-auto bg-black text-white p-6 ">
      <header className="row-span-1 border-b py-4 border-gray-500 flex justify-between items-center font-bold text-2xl">
        <span>Giỏ hàng</span>
        <span
          onClick={() => dispatch(showCart())}
          className="p-2 cursor-pointer"
        >
          <IoCloseCircleSharp size={24} />
        </span>
      </header>
      {currentCart.length === 0 && (
        <div className="w-full h-[500px] justify-center items-center  flex flex-col  ">
          <img
            src={orderEmpty}
            alt="wishlist empty"
            className="w-[200px] h-[200px] object-cover "
          />{" "}
          <div className="text-2xl font-medium text-white mt-2">
            Không có sản phẩm nào!!
          </div>
        </div>
      )}
      {currentCart.length !== 0 && (
        <>
          <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
            {currentCart &&
              currentCart?.map((item) => (
                <div
                  className="flex items-center justify-between "
                  key={item.product}
                >
                  <div className="flex gap-2">
                    <img
                      src={item.product?.thumb}
                      alt="productCart"
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-3 items-center justify-between">
                        <span className="text-sm">{item.product?.title}</span>

                        <span className="text-xs itaclic">
                          {" "}
                          x {item?.quantity}
                        </span>
                      </div>
                      <span className="text-[10px]">{item.color}</span>
                      <span className="text-sm">{`${formatMoney(
                        item.product?.price
                      )} VND`}</span>
                    </div>
                  </div>
                  <span
                    onClick={() => deleteCart(item.product?._id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer"
                  >
                    <RiDeleteBin2Fill size={16} />
                  </span>
                </div>
              ))}
          </section>
          <div className="row-span-2 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pt-4 border-t">
              <span>Tổng:</span>
              <span>
                {formatMoney(
                  currentCart?.reduce(
                    (sum, item) =>
                      sum + Number(item.product?.price * item.quantity),
                    0
                  )
                ) + ` VND`}
              </span>
            </div>
            <span className="text-center text-gray-700 text-xs italic">
              Các thông tin sản phẩm sẽ chi tiết trong phần giỏ hàng, hãy đi đến
              để thanh toán
            </span>
            <Button
              fw
              handleClick={() => {
                dispatch(showCart());
                navigate(`/${path.DETAIL_CART}`);
              }}
            >
              Đi đến giỏ hàng
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default WithBase(memo(Cart));
