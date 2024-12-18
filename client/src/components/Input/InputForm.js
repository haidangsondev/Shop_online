import clsx from "clsx";
import { memo } from "react";

function InputForm({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
  readOnly,
}) {
  return (
    <div className={clsx("flex flex-col h-[78px] gap-2", style)}>
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        readOnly={readOnly}
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-input my-auto", fullWidth && "w-full")}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
}

export default memo(InputForm);
