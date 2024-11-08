import { forwardRef } from "react";

const Toggle = forwardRef(function (
  { children, onChange, checked, style, textStyle, ...props },
  ref
) {
  return (
    <div className="form-control rounded min-w-20">
      <label className="label cursor-pointer">
        <span
          className={`label-text text-base-content font-bold px-4 ${textStyle}`}
        >
          {children}
        </span>
        <input
          type="checkbox"
          className={`checkbox checkbox-sm ${style}`}
          onChange={onChange}
          checked={checked}
          ref={ref}
          {...props}
        />
      </label>
    </div>
  );
});

export default Toggle;
