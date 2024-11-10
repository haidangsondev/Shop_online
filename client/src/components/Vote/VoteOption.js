import { memo, useEffect, useRef, useState } from "react";
import logo from "img/image.png";
import { voteState } from "utils/constant";
import icons from "utils/icons";
import Button from "../Button/Button";

const { FaStar } = icons;
function VoteOption({ nameProduct, handleSubmitComment }) {
  const [star, setstar] = useState(null);
  const [comment, setComment] = useState("");

  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      ref={modalRef}
      className="p-4 flex flex-col items-center gap-4 justify-center bg-white w-[700px] h-[500px]"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-center text-medium text-lg">{`Đánh giá sản phẩm ${nameProduct}`}</h2>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Nhận xét"
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>Bạn cảm nhận như thế nào về sản phẩm?</p>
        <div className="flex items-center justify-center gap-4">
          {voteState.map((item) => (
            <div
              onClick={() => setstar(item.id)}
              className="w-[110px] text-sm bg-gray-300 cursor-pointer rounded-md p-4 h-[100px] flex flex-col items-center justify-center gap-2"
              key={item.id}
            >
              {Number(star) && star >= item.id ? (
                <FaStar color="red" />
              ) : (
                <FaStar color="gray" />
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button handleClick={() => handleSubmitComment({ comment, star })} fw>
        Thực hiện
      </Button>
    </div>
  );
}

export default memo(VoteOption);
