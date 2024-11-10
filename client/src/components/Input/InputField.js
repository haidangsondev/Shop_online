import clsx from "clsx";
import { memo } from "react";

function InputField({
  type,
  nameKey,
  value,
  setValue,
  isValidate,
  setIsValidate,
  style,
  fullwidth,
  placeholder,
}) {
  return (
    <div className={clsx(fullwidth && "w-full")}>
      <input
        type={type || "text"}
        className={clsx("px-4 py-2 rounded-sm border mt-2 w-full", style)}
        placeholder={
          placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((pre) => ({ ...pre, [nameKey]: e.target.value }))
        }
        onFocus={() => setIsValidate && setIsValidate([])}
      />
      {isValidate?.some((item) => item.name === nameKey) && (
        <small className="text-main text-[12px] italic">
          {isValidate?.find((item) => item.name === nameKey)?.message}{" "}
        </small>
      )}
    </div>
  );
}

export default memo(InputField);
