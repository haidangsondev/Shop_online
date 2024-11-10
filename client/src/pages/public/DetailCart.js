import { Button, QuantityOption, SelectQuantity } from "components";
import WithBase from "hoc/withBase";
import { memo } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "utils/helper";
import path from "utils/path";
import logo from "img/image.png";
import cartEmpty from "img/cartempty.webp";

function DetailCart({ navigate, location }) {
  const { currentCart, current } = useSelector((state) => state.user);
  console.log(currentCart);
  const handleCheckout = () => {
    if (!current?.address) {
      Swal.fire({
        title: "Địa chỉ",
        text: "Bạn cần tiến hành nhập địa chỉ để thanh toán!",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.USER}/${path.PROFILE}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    } else {
      navigate(`/${path.CHECKOUT}`);
    }
  };
  return (
    <div className="w-full px-4">
      {currentCart.length === 0 && (
        <div className="w-[750px] h-full justify-center items-center mt-[100px] ml-[100px]  flex flex-col  ">
          <img
            src={cartEmpty}
            alt="wishlist empty"
            className="w-[220px] h-[220px] object-cover opacity-65"
          />{" "}
          <div className="text-2xl font-medium text-gray-700">
            Không có sản phẩm nào!!
          </div>
        </div>
      )}

      {currentCart.length !== 0 && (
        <>
          <NavLink
            to={"/"}
            className="h-[75px] flex justify-center items-center text-3xl font-bold py-4 "
          >
            <img src={logo} alt="log" className="w-17 h17 object-cover" />
          </NavLink>
          <table className="table-auto mt-3 text-left w-full">
            <thead className=" font-bold bg-gray-700 text-[13px] border border-blue-300 text-white ">
              <tr>
                <th className="py-2 text-center">Thumb</th>
                <th className="py-2 text-center">Title</th>
                <th className="py-2 text-center">Color</th>
                <th className="py-2 text-center">Price</th>
                <th className="py-2 text-center">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map((item) => (
                <tr keys={item._id}>
                  <td className=" text-center">
                    {" "}
                    <Link
                      to={`/${item?.product?.category}/${item?.product?._id}/${item?.product?.title}`}
                    >
                      <img
                        src={item.product?.thumb}
                        alt="productCart"
                        className="w-28 h-28 object-cover"
                      />
                    </Link>
                  </td>
                  <td className=" text-center">{item.title}</td>
                  <td className=" text-center">{item.color}</td>
                  <td className=" text-center">
                    {formatMoney(item.quantity * item?.product?.price) + ` VND`}
                  </td>
                  <td className=" text-center">
                    <QuantityOption
                      defaultQuantity={item.quantity}
                      data={item}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col mb-12 justify-center items-end gap-3">
            <span className="flex items-center gap-8 text-sm">
              <span>Tổng:</span>
              <span className="text-gray-700 font-bold">
                {formatMoney(
                  currentCart?.reduce(
                    (sum, item) => sum + +item?.product?.price * item?.quantity,
                    0
                  )
                ) + ` VND`}
              </span>
            </span>
            <span className="text-center text-gray-700 text-sm italic">
              Các thông tin sản phẩm sẽ chi tiết trong phần giỏ hàng, hãy đi đến
              để thanh toán
            </span>
            <Button handleClick={() => handleCheckout()}>Thanh toán</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default WithBase(memo(DetailCart));
