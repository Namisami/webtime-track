import { HTMLAttributes } from 'react';
import './Box.css';

export type BoxProps = HTMLAttributes<HTMLDivElement>;

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={`box ${className}`} {...props}>
      { children }
    </div>
  )
};

export default Box;
