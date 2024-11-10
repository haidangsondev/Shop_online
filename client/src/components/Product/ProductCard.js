import WithBase from "hoc/withBase";
import { memo } from "react";
import { createRatings, formatMoney } from "utils/helper";

function ProductCard({ data, navigate }) {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div
        className="flex w-full border"
        onClick={() =>
          navigate(
            `/${data?.category?.toLowerCase()}/${data?._id}/${data?.title}`
          )
        }
      >
        <img
          src={data?.thumb}
          alt="Product Card"
          className="w-[120px] object-contain p-4"
        />
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
          <span className="line-clamp-1">{data?.title}</span>
          <span>{`${formatMoney(data?.price)} VND`}</span>
          <span className="flex h-4">
            {createRatings(data?.totalRatings, 20)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WithBase(memo(ProductCard));
