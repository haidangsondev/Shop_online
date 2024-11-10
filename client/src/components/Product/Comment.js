import { memo } from "react";
import avatar from "img/userDefault.png";
import moment from "moment";
import { createRatings } from "utils/helper";

// moment.locale("vi");

function Comment({
  image = avatar,
  name = "Ẩn danh",
  updatedAt,
  comment,
  star,
}) {
  // Định dạng ngày theo kiểu ngày tháng năm
  const formattedDate = moment(updatedAt).format("l");

  return (
    <div className="flex gap-4 ">
      <div className="flex-none">
        <img
          src={image}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span>{formattedDate}</span>
        </div>
        <div className="flex flex-col gap-2 px-4 text-sm mt-4 border border-gray-300 py-2 bg-gray-100">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Đánh giá:</span>

            <span className="flex items-center gap-1">
              {createRatings(star, 20)?.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </span>
          </span>
          <span className="flex gap-1 ">
            <span className="font-semibold">Nội dung:</span>
            <span className="flex items-center gap-1 ">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Comment);
