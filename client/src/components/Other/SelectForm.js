import clsx from "clsx";

function SelectForm({
  options = [],
  register,
  id,
  validate,
  errors,
  style,
  fullWidth,
  defaultValue,
  label,
}) {
  return (
    <div div className={clsx("flex flex-col gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        defaultValue={defaultValue}
        className={clsx(
          "form-select max-h-[42px]",
          fullWidth && "w-full",
          style
        )}
        id={id}
        {...register(id, validate)}
      >
        <option value="">Chọn</option>
        {options?.map((item) => (
          <option value={item.code}>{item.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
}

export default SelectForm;
