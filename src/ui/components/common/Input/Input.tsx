import { AllHTMLAttributes, ChangeEvent, memo } from "react";
import "./Input.css";

type InputProps = Omit<
  AllHTMLAttributes<HTMLInputElement>,
  "name" | "label" | "value" | "onChange"
> & {
  name: string;
  label: string;
  value?: string;
  onChange: (name: string, value?: string) => void;
};

const Input = memo(function Input({
  name,
  label,
  value,
  className = "",
  onChange,
  ...rest
}: InputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  }

  return (
    <div className={`input ${className}`}>
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__input"
        value={value}
        id={name}
        name={name}
        onChange={handleInputChange}
        {...rest}
      />
    </div>
  );
});

export default Input;
