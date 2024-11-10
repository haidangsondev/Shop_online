import { memo, useEffect, useRef } from "react";
import icons from "utils/icons";
const { FaStar } = icons;
function Votebar({ number, ratings, totalRatings }) {
  const percentRef = useRef();
  useEffect(() => {
    // percentRef.current.style.cssText = `right: 80%`;
    percentRef.current.style.cssText = `right: ${ratings === 0 ? 100 : 0}%`;
  }, [ratings, totalRatings]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <FaStar color="red" />
      </div>
      <div className="w-[75%] ">
        <div className="w-full h-[6px] relative bg-gray-200 rounded-l-full rounded-r-full">
          <div ref={percentRef} className="absolute inset-0 bg-red-500"></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs text-400">{`${ratings} đánh giá`}</div>
    </div>
  );
}

export default memo(Votebar);
