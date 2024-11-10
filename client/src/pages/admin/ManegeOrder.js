import { apiGetOrders } from "apis";
import { InputForm } from "components";
import WithBase from "hoc/withBase";
import useDebounce from "hook/useDebounce";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { formatMoney } from "utils/helper";

function ManegeOrder({ navigate, location }) {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({});

  const fetchApiOrders = async (params) => {
    const response = await apiGetOrders({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    console.log(response);
    if (response?.success) {
      setOrders(response.Orders);
      setCounts(response.counts);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDebounce]);
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchApiOrders(searchParams);
  }, [params]);
  return (
    <div className="w-full pl-8 flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full bg-white flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl font-bold tracking-tight">Quản lí hóa đơn</h1>
      </div>
      <div className="flex w-full justify-end items-center px-4 ">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Tìm kiếm..."
          />
        </form>
      </div>
      <table className="table-auto mb-6 text-left w-full">
        <thead className=" font-bold bg-gray-700 text-[13px] border border-blue-300 text-white ">
          <tr>
            <th className="py-2 text-center">STT</th>
            <th className="py-2 text-center">Total</th>
            <th className="py-2 text-center">Status</th>
            <th className="py-2 text-center">Product</th>
            <th className="py-2 text-center">User</th>
            <th className="py-2 text-center">Created</th>
            <th className="py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, index) => (
            <tr key={item._id} className="text-[13px] ">
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  +process.env.REACT_APP_PRODUCT_LIMIT +
                  index +
                  1}
              </td>
              <td className="text-center py-2">{item.total}</td>
              <td className="text-center py-2">{item.status}</td>
              <td>
                {item?.products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-2 items-center justify-start"
                  >
                    <div>
                      <img
                        src={item.thumb}
                        alt="thumb"
                        className="w-[130px] h-[130px] object-contain"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex items-center ">
                        <span className="font-medium">{item.title} </span>
                        <span className="pl-2">x {item.quantity} </span>
                      </div>
                      <span>{item.color} </span>
                      <span>{`${formatMoney(item.price)} VND`}</span>
                    </div>
                  </div>
                ))}
              </td>
              <td> {item.orderBy.username}</td>
              <td> {moment(item.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WithBase(memo(ManegeOrder));
