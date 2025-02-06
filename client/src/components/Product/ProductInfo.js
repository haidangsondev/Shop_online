import { useState, memo } from "react";
import { productInfo } from "utils/constant";
import Votebar from "../Vote/Votebar";
import { createRatings } from "utils/helper";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "redux/reduxSlice/productCategoriesSlice";
import VoteOption from "../Vote/VoteOption";
import { apiRatings } from "apis";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "utils/path";
import Comment from "./Comment";

function ProductInfo({
  totalRatings,
  ratings,
  title,
  product_id,
  renderPageVote,
}) {
  const [isActive, setIsActive] = useState("1");

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmitComment = async ({ comment, star }) => {
    if (!comment || !star || !product_id) {
      alert("Các trường đánh giá là bắt buộc");
      return;
    }
    const response = await apiRatings({
      comment,
      star,
      product_id,
      updatedAt: Date.now(),
    });
    if (response.success) {
      swal
        .fire("Thành công!", "Đánh giá sản phẩm thành công", "success")
        .then(() => {
          dispatch(
            showModal({
              isShowModal: false,
              isShowModalChildren: null,
            })
          );
        });
      renderPageVote();
    }
  };
  const handleVote = () => {
    if (!isLogin) {
      swal
        .fire({
          text: "Đăng nhập để đánh giá",
          cancelButtonText: "Huỷ",
          confirmButtonText: "Đăng nhập ",
          title: "Opps!",
          showCancelButton: true,
        })
        .then((response) => {
          if (response.isConfirmed) navigate(`/${path.LOGIN}`);
        });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          isShowModalChildren: (
            <VoteOption
              handleSubmitComment={handleSubmitComment}
              nameProduct={title}
            />
          ),
        })
      );
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4 relative bottom-[-1px]">
        {productInfo?.map((item) => (
          <span
            key={item.id}
            className={`p-2 px-4 cursor-pointer ${
              isActive === item.id
                ? "bg-white border border-b-0"
                : "bg-gray-400"
            }`}
            onClick={() => setIsActive(item.id)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="w-full  p-4">
        {productInfo.some((item) => item.id === isActive) &&
          productInfo?.find((item) => item.id === isActive)?.content}
      </div>
      <div className="flex flex-col p-4">
        <span className="my-3 font-semibold cursor-pointer ">
          TRẢI NGHIỆM NGƯỜI DÙNG
        </span>
        <div className="flex">
          <div className="flex-4 flex flex-col items-center justify-center border border-red-500 gap-2">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex items-center gap-1">
              {createRatings(totalRatings, 20)?.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} đánh giá`}</span>
          </div>
          <div className="flex-6 p-4 flex flex-col">
            {Array.from(Array(5).keys())
              .reverse()
              .map((item) => (
                <Votebar
                  key={item}
                  number={item + 1}
                  totalRatings={totalRatings}
                  ratings={
                    ratings?.filter((element) => +element.star === item + 1)
                      ?.length
                  }
                />
              ))}
          </div>
        </div>
        <div className="flex justify-end  items-center p-4 text-sm flex-col gap-2">
          <span>Bạn có muốn đánh giá sản phẩm?</span>
          <Button handleClick={handleVote}>Đánh giá</Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((item) => (
            <Comment
              key={item._id}
              star={item.star}
              updatedAt={item.updatedAt}
              comment={item.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductInfo);
