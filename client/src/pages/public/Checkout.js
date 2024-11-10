import { Paypal } from "components";
import WithBase from "hoc/withBase";
import payment1 from "img/payment1.avif";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "redux/reduxActions/userAction";
import { formatMoney } from "utils/helper";
function Checkout({ dispatch, navigate }) {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(currentCart);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getUser());
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return (
    <div className="p-8 grid grid-cols-10 gap-6 w-full h-full max-h-screen overflow-y-auto ">
      <div className="w-full flex  col-span-4 justify-center items-center">
        <img src={payment1} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex flex-col  w-full justify-center items-center col-span-6 gap-6">
        <h2 className="text-2xl font-bold text-left">Đơn hàng</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-gray-400">
              <th className="p-2 text-center">Sản phẩm</th>
              <th className="p-2 text-center">Số lượng</th>
              <th className="p-2 text-center">Giá</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((item) => (
              <tr key={item.product._id}>
                <td className="p-2 text-center">{item.product.title}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-center">
                  {formatMoney(item.product.price) + " VND"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full text-left  text-sm">
          <span className="pr-1">Tổng:</span>
          <span className="text-gray-700 font-bold">
            {formatMoney(
              currentCart?.reduce(
                (sum, item) => sum + +item?.product?.price * item?.quantity,
                0
              )
            ) + ` VND`}
          </span>
        </div>
        <div className="w-full text-left  text-sm">
          <span className="pr-1">Địa chỉ nhận hàng:</span>
          <span className="text-gray-700 font-bold">{current?.address}</span>
        </div>

        <div className="w-full mx-auto">
          {
            <Paypal
              setIsSuccess={setIsSuccess}
              payload={{
                products: currentCart,
                total:
                  +currentCart?.reduce(
                    (sum, item) => sum + +item?.product?.price * item?.quantity,
                    0
                  ) / 23500,
                address: current?.address,
              }}
              amount={Math.round(
                +currentCart?.reduce(
                  (sum, item) => sum + +item?.product?.price * item?.quantity,
                  0
                ) / 23500
              )}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default WithBase(memo(Checkout));
