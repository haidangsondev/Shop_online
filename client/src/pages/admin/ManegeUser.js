import { apiDeleteUser, apiGetAllUser, apiUpdateUser } from "apis";
import { useCallback, useEffect, useState } from "react";
import { roles, isBlocked } from "utils/constant";
import moment from "moment";
import {
  Button,
  InputField,
  InputForm,
  Pagination,
  SelectForm,
} from "components";
import useDebounce from "hook/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ManegeUser() {
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [params] = useSearchParams();
  const [isEdit, setIsEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    username: "",
    role: "",
    phone: "",
    isBlocked: "",
  });

  const fetchUser = async (params) => {
    const response = await apiGetAllUser({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT,
    });
    console.log({user:response})
    if (response?.success) setUsers(response);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const queriesDebounce = useDebounce(queries.q, 300);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUser(queries);
  }, [queriesDebounce, params, update]);

  const handleSubmitUpdate = async (data) => {
    const response = await apiUpdateUser(data, isEdit._id);
    if (response?.success) {
      setIsEdit(null);
      toast.success(response.message);
      render();
    } else {
      toast.error(response.message);
    }
  };
  const handleSubmitDelete = async (user_id) => {
    Swal.fire({
      title: "Xóa tài khoản",
      text: "Bạn có chắc chắn xóa",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(user_id);
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
    <div>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>ManegeUser</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            // eslint-disable-next-line react/style-prop-object
            style={"w-[500px]"}
            placeholder={"Tìm kiếm.."}
          />
        </div>
        <form onSubmit={handleSubmit(handleSubmitUpdate)}>
          {isEdit && <Button type="submit">Cập nhật </Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[13px] border border-blue-300 text-white">
              <tr>
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">HỌ TÊN</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">ROLE</th>
                <th className="px-4 py-2">SDT</th>
                <th className="px-4 py-2">TRẠNG THÁI</th>
                <th className="px-4 py-2">NGÀY TẠO</th>
                <th className="px-4 py-2">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {users?.Users.map((item, index) => (
                <tr
                  key={item._id}
                  className="border border-gray-500 text-gray-700"
                >
                  <th className="py-2 px-4">{index + 1}</th>
                  <th className="py-2 px-4">
                    {isEdit?._id === item._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={"username"}
                        validate={{ required: "Trường là bắt buộc" }}
                        fullWidth
                        defaultValue={isEdit?.username}
                      />
                    ) : (
                      <span>{item.username}</span>
                    )}
                  </th>
                  <th className="py-2 px-4">
                    {isEdit?._id === item._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={"email"}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email không hợp lệ",
                          },
                        }}
                        fullWidth
                        defaultValue={isEdit?.email}
                      />
                    ) : (
                      <span>{item.email}</span>
                    )}
                  </th>
                  <th className="py-2 px-4">
                    {isEdit?._id === item._id ? (
                      <SelectForm
                        options={roles}
                        id={"role"}
                        validate={{ required: "bắt buộc" }}
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={+item.role}
                      />
                    ) : (
                      <span>
                        {
                          roles.find(
                            (checkRole) => +checkRole.code === +item.role
                          )?.value
                        }
                      </span>
                    )}
                  </th>
                  <th className="py-2 px-4">
                    {isEdit?._id === item._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={"phone"}
                        validate={{
                          required: "Trường là bắt buộc",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits",
                          },
                        }}
                        fullWidth
                        defaultValue={isEdit?.phone}
                      />
                    ) : (
                      <span>{item.phone}</span>
                    )}
                  </th>
                  <th className="py-2 px-4">
                    {isEdit?._id === item._id ? (
                      <SelectForm
                        options={isBlocked}
                        id={"isBlocked "}
                        validate={{ required: "bắt buộc" }}
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={item.isBlocked}
                      />
                    ) : (
                      <span> {item.isBlocked ? "Bị khóa" : "Hoạt động"}</span>
                    )}
                  </th>
                  <th className="py-2 px-4">
                    {moment(item.createAt).format("DD/MM/YYYY")}
                  </th>
                  <th>
                    {isEdit ? (
                      <span
                        className="px-2 hover:underline cursor-pointer"
                        onClick={() => setIsEdit(null)}
                      >
                        Về
                      </span>
                    ) : (
                      <span
                        className="px-2 hover:underline cursor-pointer"
                        onClick={() => setIsEdit(item)}
                      >
                        Sửa
                      </span>
                    )}
                    <span
                      onClick={() => handleSubmitDelete(item._id)}
                      className="px-2 hover:underline cursor-pointer"
                    >
                      Xóa
                    </span>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="w-full flex justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
}

export default ManegeUser;
