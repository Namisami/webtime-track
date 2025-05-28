import { ChangeEvent, memo } from "react";
import "./InputNumber.css";

type InputNumberProps = {
  name: string;
  label: string;
  value?: number;
  className?: string;
  onChange: (name: string, value?: number) => void;
};

const InputNumber = memo(function InputNumber({
  name,
  label,
  value,
  className = "",
  onChange,
}: InputNumberProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, Number(e.target.value));
  }

  return (
    <div className={`input-number ${className}`}>
      <label className="input-number__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-number__input"
        value={value}
        id={name}
        name={name}
        type="number"
        onChange={handleInputChange}
      />
    </div>
  );
});

export default InputNumber;
