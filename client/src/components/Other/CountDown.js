import { memo } from "react";

function CountDown({ number, unix }) {
  return (
    <div className="w-[30%] h-[60px] border bg-slate-300 flex justify-center items-center flex-col ">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unix}</span>
    </div>
  );
}

export default memo(CountDown);
