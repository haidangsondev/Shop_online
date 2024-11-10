import { apiDeleteProduct, apiProduct } from "apis";
import { InputForm, Pagination } from "components";
import useDebounce from "hook/useDebounce";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import icons from "utils/icons";
import CustomVariant from "./CustomVariant";
const { FaRegEdit, MdDeleteSweep } = icons;
function ManegeProduct() {
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({});
  const navigate = useNavigate();
  const location = useLocation();

  const fetchApiProduct = async (params) => {
    const response = await apiProduct({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    if (response?.success) {
      setProducts(response.Product);
      setCounts(response.counts);
    }
  };

  const render = useCallback(() => {
    setUpdate(!update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [queryDebounce, update]);
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchApiProduct(searchParams);
  }, [params]);

  const handleSubmitDelete = async (product_id) => {
    Swal.fire({
      title: "Xóa sản phẩm",
      text: "Bạn có chắc chắn xóa",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(product_id);
        if (response?.success) {
          toast.success(response.message);
          render();
        } else {
          toast.error(response.message);
        }
      }
    });
  };
  return (
    <div className="w-full pl-8 flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}

      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full bg-white flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl font-bold tracking-tight">Quản lí sản phẩm</h1>
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
            <th className="py-2 text-center">Thumb</th>
            <th className="py-2 text-center">Title</th>
            <th className="py-2 text-center">Brand</th>
            <th className="py-2 text-center">Category</th>
            <th className="py-2 text-center">Price</th>
            <th className="py-2 text-center">Quantity</th>
            <th className="py-2 text-center">Sold</th>
            <th className="py-2 text-center">Color</th>
            <th className="py-2 text-center">Ratings</th>
            <th className="py-2 text-center">Created</th>
            <th className="py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => (
            <tr key={item._id} className="text-[13px] border-b border-gray-700">
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  +process.env.REACT_APP_PRODUCT_LIMIT +
                  index +
                  1}
              </td>
              <td className="text-center py-2">
                <img
                  src={item.thumb}
                  alt="Anh bia"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="text-center py-2">{item.title}</td>
              <td className="text-center py-2">{item.brand}</td>
              <td className="text-center py-2">{item.category}</td>
              <td className="text-center py-2">{item.price}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-center py-2">{item.sold}</td>
              <td className="text-center py-2">{item.color}</td>
              <td className="text-center py-2">{item.totalRatings}</td>
              <td className="text-center py-2">
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="py-5 flex justify-center items-center">
                <span
                  onClick={() => setEditProduct(item)}
                  className="px-1 text-gray-700 hover:text-gray-950 cursor-pointer"
                >
                  <FaRegEdit size={20} />
                </span>
                <span
                  onClick={() => handleSubmitDelete(item._id)}
                  className="px-1 text-gray-700 hover:text-gray-950 cursor-pointer"
                >
                  <MdDeleteSweep size={20} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
}

export default ManegeProduct;
