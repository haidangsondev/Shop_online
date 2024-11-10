import { useState, useCallback, useEffect, memo } from "react";
import { Button, InputField } from "components";
import login from "img/banner1.jpg";
import { apiForgotPassword, apiLogin, apiRegister } from "apis";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import path from "utils/path";
import { logining } from "redux/reduxSlice/userSlice";
import { validate } from "utils/helper";
import WithBase from "hoc/withBase";

function Login({ dispatch, navigate }) {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isValidate, setIsValidate] = useState([]);

  useEffect(() => {
    setPayload({ email: "", password: "" });
    setIsValidate([]);
  }, [isRegister]);

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email: isEmail });
    swal.fire(
      response.success ? "Thành công" : "Lỗi!",
      response.message,
      response.success ? "success" : "error"
    );
  };

  const handleSubmit = useCallback(async () => {
    const countValidate = validate(payload, setIsValidate);
    if (countValidate === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        swal.fire(
          response.success ? "Thành công" : "Lỗi!",
          response.message,
          response.success ? "success" : "error"
        );
      } else {
        const response = await apiLogin(payload);
        console.log(response);
        swal.fire(
          response.success ? "Thành công" : "Lỗi!",
          response.message,
          response.success ? "success" : "error"
        );
        if (response.success) {
          dispatch(
            logining({
              isLogin: true,
              token: response.accessToken,
              current: response.user,
            })
          );
          navigate(`/${path.HOME}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, isRegister]);

  return (
    <div className="w-full h-full relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 ">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">
              Hãy nhập email của bạn để thực hiện quá trình đổi mật khẩu
            </label>
            <input
              type="text"
              id="email"
              className="w-[800px] pb-2 outline-none placeholder:text-sm"
              placeholder="email@gmail.com"
              onChange={(e) => setIsEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mt-4 gap-4">
            <Button
              name="Submit"
              handleClick={handleForgotPassword}
              // eslint-disable-next-line react/style-prop-object
              style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 hover:bg-blue-700"
            >
              Thực hiện{" "}
            </Button>
            <Button
              handleClick={() => setIsForgotPassword(false)}
              // eslint-disable-next-line react/style-prop-object
              style="px-4 py-2 rounded-md text-white bg-red-500 text-semibold my-2 hover:bg-red-700"
            >
              Quay lại{" "}
            </Button>
          </div>
        </div>
      )}
      <img src={login} alt="login" className="w-full h-full object-contain" />
      <div className="absolute top-0 right-1/2 bottom-0 left-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8 text-center">
            {isRegister ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
          </h1>
          <InputField
            value={payload.email}
            nameKey="email"
            setValue={setPayload}
            isValidate={isValidate}
            setIsValidate={setIsValidate}
          />
          <InputField
            value={payload.password}
            nameKey="password"
            setValue={setPayload}
            type="password"
            isValidate={isValidate}
            setIsValidate={setIsValidate}
          />
          <Button fw handleClick={handleSubmit}>
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </Button>
          <div className="flex items-center justify-between w-full my-2 text-sm">
            {!isRegister && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Quên mật khẩu?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Tạo tài khoản
              </span>
            )}
            {isRegister && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Đăng nhập
              </span>
            )}
          </div>
          <Link
            to={`/${path.HOME}`}
            className="text-main hover:underline cursor-pointer text-sm"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WithBase(memo(Login));
