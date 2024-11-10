import { Button, InputForm } from "components";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import avatar from "img/userDefault.png";
import { apiUpdateProfile } from "apis";
import { getUser } from "redux/reduxActions/userAction";
import { toast } from "react-toastify";
import { NavLink, useSearchParams } from "react-router-dom";
import WithBase from "hoc/withBase";
import logo from "img/image.png";

function Profile({ navigate, dispatch }) {
  const { current } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({});
  const [searchParams] = useSearchParams();
  useEffect(() => {
    reset({
      username: current?.username,
      email: current?.email,
      phone: current?.phone,
      avatar: current?.avatar,
      address: current?.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let result of Object.entries(data)) {
      formData.append(result[0], result[1]);
    }

    const response = await apiUpdateProfile(formData);
    if (response?.success) {
      dispatch(getUser());
      toast.success(response.message);
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full relative px-4">
      {" "}
      <NavLink
        to={"/"}
        className="h-[75px] flex justify-center items-center text-3xl font-bold py-4 "
      >
        <img src={logo} alt="log" className="w-17 h17 object-cover" />
      </NavLink>
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="Họ tên:"
          register={register}
          errors={errors}
          id="username"
          // validate={{ required: "Trường là bắt buộc" }}
        />
        <InputForm
          label="Email:"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Trường là bắt buộc",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          }}
        />
        <InputForm
          label="SDT:"
          register={register}
          errors={errors}
          id="phone"
          validate={{
            required: "Trường là bắt buộc",
            pattern: {
              value: /^[0-9]\d{9,10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          }}
        />
        <InputForm
          label="Địa chỉ:"
          register={register}
          errors={errors}
          id="address"
          // validate={{
          //   required: "Trường là bắt buộc",
          // }}
        />

        <div className="flex items-center gap-2">
          <span className="font-semibold">Trạng thái:</span>
          <span>{current?.isBlocked ? "Khóa" : "Hoạt động"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Quyền:</span>
          <span>
            {+current?.role === 2000 ? "Quản trị viên" : "Người dùng"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Ngày tạo:</span>
          <span>{moment(current?.createAt).format("DD/MM/YYYY")}</span>
        </div>
        <div>
          <label htmlFor="file" className="flex items-center gap-4">
            <span className="font-semibold">Ảnh đại diện:</span>
            <img
              alt="avatar"
              src={current?.avatar || avatar}
              className="w-20 h-20 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        {isDirty && <Button type="submit">Cập nhật</Button>}
      </form>
    </div>
  );
}

export default WithBase(Profile);
