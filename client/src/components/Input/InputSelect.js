import { memo } from "react";

function InputSelect({ value, options, changeInputSelect }) {
  return (
    <select
      className=" py-2 text-sm border border-gray-400 "
      value={value}
      onChange={(e) => changeInputSelect(e.target.value)}
    >
      <option value="">Chọn</option>
      {options?.map((item) => (
        <option key={item.id} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

export default memo(InputSelect);
