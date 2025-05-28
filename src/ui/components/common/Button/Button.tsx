import { AllHTMLAttributes, memo } from "react";
import './Button.css';

type ButtonProps = AllHTMLAttributes<HTMLButtonElement> & {
  type?: HTMLButtonElement["type"];
};

const Button = memo(function Button({
  type="button",
  className='',
  children,
  ...props
}: ButtonProps) {
  return (
    <button 
      className={`button ${className}`}
      type={type}
      {...props}
    >
      { children }
    </button>
  )
});

export default Button;
