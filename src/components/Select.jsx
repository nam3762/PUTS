import { forwardRef } from "react";

const Select = forwardRef(function (
  { style, children, options = [], onChange, ...rest },
  ref
) {
  return (
    <select
      className={`select w-full max-w-xs text-base-content mt-2 ${style}`}
      ref={ref}
      onChange={onChange}
      {...rest} // 나머지 props (register의 기능을 받을 수 있게)
    >
      <option value="" disabled>
        {children}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
