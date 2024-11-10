import { FaStar, FaRegStar } from "react-icons/fa";

export const formatCreateSlug = (string) => {
  return string
    .toLowerCase() // Chuyển đổi toàn bộ chuỗi thành chữ thường
    .normalize("NFD") // Phân tách các ký tự đặc biệt thành ký tự cơ bản và dấu phụ
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu phụ
    .trim() // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
    .split(/\s+/) // Chia chuỗi thành mảng các từ, phân tách bằng khoảng trắng hoặc ký tự phân cách
    .join("-"); // Kết nối các từ bằng dấu gạch ngang
};

export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();
export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const createRatings = (number, size) => {
  if (!Number(number)) return;
  const start = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++)
    start.push(<FaStar color="red" size={size || 16} />);
  for (let i = 5; i > +number; i--)
    start.push(<FaRegStar color="red" size={size || 16} />);
  return start;
};

export const validate = (payload, setIsValidate) => {
  let countValidate = 0;
  const formatPlayload = Object.entries(payload);
  for (let item of formatPlayload) {
    if (item[1].trim() === "") {
      setIsValidate((pre) => [
        ...pre,
        { name: item[0], message: "Trường là bắt buộc" },
      ]);
      countValidate++;
    }
  }
  for (let item of formatPlayload) {
    switch (item[0]) {
      case "email":
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (!item[1].match(regex)) {
          countValidate++;
          setIsValidate((pre) => [
            ...pre,
            { name: item[0], message: "Email không đúng định dạng" },
          ]);
        }
        break;
      case "password":
        if (item[1].length < 6) {
          countValidate++;
          setIsValidate((pre) => [
            ...pre,
            { name: item[0], message: "Mật khẩu ít nhất 6 kí tự" },
          ]);
        }
        break;
      default:
        break;
    }
  }
  return countValidate;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const toBase64 = (file) => {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
