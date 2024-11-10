import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert2";
import path from "utils/path";

function FinalRegister() {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      swal.fire("Lỗi!", "Đăng ký không thành công", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    } else {
      swal.fire("Thành công!", "Đăng ký thành công", "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>FinalRegister</div>;
}

export default FinalRegister;
