import { apiGetOrderUser } from "apis";
import { CustomSelect, InputForm, Pagination } from "components";
import WithBase from "hoc/withBase";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, NavLink, useSearchParams } from "react-router-dom";
import { statusOrder } from "utils/constant";

import logo from "img/image.png";
import orderEmpty from "img/orderEmpty.jpg";

function History({ location, navigate }) {
  const [orders, setOrders] = useState(null);
  const [params] = useSearchParams();
  const [counts, setCounts] = useState(0);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({});

  const q = watch("q");
  const status = watch("status");

  const fetchGetOrderUser = async (params) => {
    const response = await apiGetOrderUser({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    console.log(response);
    if (response?.success) {
      setCounts(response.counts);
      setOrders(response);
    }
  };

  useEffect(() => {
    const result = Object.fromEntries([...params]);
    fetchGetOrderUser(result);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value || "" }).toString(),
    });
  };
  return (
    <div className="w-full relative px-4">
      {orders?.Orders?.length === 0 && (
        <div className="w-full h-full flex flex-col mt-[120px] justify-center items-center    ">
          <img
            src={orderEmpty}
            alt="wishlist empty"
            className="w-[220px] h-[220px] object-cover opacity-65"
          />{" "}
          <div className="text-2xl font-medium text-gray-700">
            Không có đơn hàng nào!!
          </div>
        </div>
      )}
      {orders?.Orders?.length !== 0 && (
        <>
          <NavLink
            to={"/"}
            className="h-[75px] flex justify-center items-center text-3xl font-bold py-4"
          >
            <img src={logo} alt="log" className="w-17 h17 object-cover" />
          </NavLink>

          {orders && (
            <>
              <div className="flex w-full justify-end items-center px-4 ">
                <form className="w-[45%] grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <InputForm
                      id="q"
                      register={register}
                      errors={errors}
                      fullWidth
                      placeholder="Tìm kiếm..."
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <CustomSelect
                      value={status}
                      onChange={(value) => handleSearchStatus(value)}
                      wrapClassname="w-full"
                      options={statusOrder}
                    />
                  </div>
                </form>
              </div>
              <table className="table-auto mb-6 text-left w-full">
                <thead className=" font-bold bg-gray-700 text-[13px] border border-blue-300 text-white ">
                  <tr>
                    <th className="py-2 text-center">STT</th>
                    <th className="py-2 text-center">Thumb</th>
                    <th className="py-2 text-center">Title</th>
                    <th className="py-2 text-center">Price</th>
                    <th className="py-2 text-center">Quantity</th>
                    <th className="py-2 text-center">Color</th>
                    <th className="py-2 text-center">Trạng thái</th>
                    <th className="py-2 text-center">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.Orders?.map((item, index) => (
                    <tr
                      key={item._id}
                      className="text-[13px] border-b border-gray-700"
                    >
                      <td className="text-center py-2">
                        {(+params.get("page") > 1
                          ? +params.get("page") - 1
                          : 0) *
                          +process.env.REACT_APP_PRODUCT_LIMIT +
                          index +
                          1}
                      </td>
                      <td className="text-center py-2">
                        <img
                          src={item.products[0].thumb}
                          alt="Anh bia"
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="text-center py-2">
                        {item.products[0].title}
                      </td>
                      <td className="text-center py-2">{item.total}</td>
                      <td className="text-center py-2">
                        {item.products[0].quantity}
                      </td>
                      <td className="text-center py-2">
                        {item.products[0].color}
                      </td>
                      <td className="text-center py-2">{item.status}</td>
                      <td className="text-center py-2">
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-end my-8">
                <Pagination totalCount={counts} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WithBase(memo(History));
