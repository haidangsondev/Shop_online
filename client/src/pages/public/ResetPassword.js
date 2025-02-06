import { useState } from "react";
import { Button } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "apis/";
import swal from "sweetalert2";
import path from "utils/path";

function ResetPassword() {
  const [isResetPassword, setIsResetPassword] = useState("");
  const { passwordResetToken } = useParams();

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({
      password: isResetPassword,
      tokenPassword: passwordResetToken,
    });
    if (response.success) {
      swal
        .fire(
          response.success ? "Thành công" : "Lỗi!",
          response.message,
          response.success ? "success" : "error"
        )
        .then(() => {
          navigate(`/${path.LOGIN}`);
        });
    }
  };
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 ">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">
          Hãy nhập mật khẩu của bạn để thực hiện quá trình đổi mật khẩu
        </label>
        <input
          type="password"
          id="password"
          className="w-[800px] pb-2 outline-none placeholder:text-sm"
          placeholder="password"
          onChange={(e) => setIsResetPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end mt-4 gap-4">
        <Button
          handleClick={handleResetPassword}
          // eslint-disable-next-line react/style-prop-object
          style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 hover:bg-blue-700"
        >
          Thực hiện{" "}
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
