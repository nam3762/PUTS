import { forwardRef } from "react";

const InputText = forwardRef(function (
  { name, onChange, children, style = "", ...props },
  ref
) {
  return (
    <div className={`mt-2 w-full ${style}`}>
      <input
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        placeholder={children}
        className="input input-bordered text-base-content w-full overflow-hidden text-ellipsis whitespace-nowrap"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default InputText;
