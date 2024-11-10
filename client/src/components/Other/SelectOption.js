import { memo } from "react";

function SelectOption({ icon }) {
  return (
    <div className="w-10 h-10 bg-white rounded-full border  border-main shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white cursor-pointer">
      {icon}
    </div>
  );
}

export default memo(SelectOption);
