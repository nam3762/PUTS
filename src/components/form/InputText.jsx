import { forwardRef } from "react";

// 기본적으로 input text를 위해 만든 컴포넌트
// React hook form 사용을 위해 ref를 받아야해서 forwardRef 사용함
const InputText = forwardRef(function (
  { name, onChange, children, style },
  ref
) {
  return (
    <label
      className={`input input-bordered text-base-content flex items-center gap-2 mt-2 ${style}`}
      htmlFor={name}
    >
      <input
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        placeholder={children}
        className="grow"
        ref={ref}
      />
    </label>
  );
});

export default InputText;
