import { memo } from "react";

function Button({ children, handleClick, style, fw, type = "button" }) {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main text-semibold my-3  ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => handleClick && handleClick()}
    >
      <span>{children}</span>
    </button>
  );
}

export default memo(Button);
