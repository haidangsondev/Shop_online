import { memo } from "react";

function SelectQuantity({
  quantity,
  handleInputQuantity,
  handleChangeQuantity,
}) {
  return (
    <div className="flex items-center justify-center">
      <span
        onClick={() => handleChangeQuantity("minus")}
        className="p-2 cursor-pointer border-r border-black"
      >
        -
      </span>
      <input
        value={quantity}
        onChange={(e) => handleInputQuantity(e.target.value)}
        type="text"
        className="p-2 outline-none w-[50px] text-black text-center"
      />
      <span
        onClick={() => handleChangeQuantity("plus")}
        className="p-2 cursor-pointer border-l border-black"
      >
        +
      </span>
    </div>
  );
}

export default memo(SelectQuantity);
