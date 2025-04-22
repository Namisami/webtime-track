import { HTMLAttributes, memo } from 'react';
import './Progressbar.css';

export type ProgressbarProps = HTMLAttributes<HTMLProgressElement> & {
  value: number;
  max: number;
};

const Progressbar = ({
  value,
  max,
  className,
  ...props
}: ProgressbarProps) => {
  return (
    <progress 
      className={`progressbar ${className}`} 
      max={max} 
      value={value} 
      {...props}
    >
      {value}%
    </progress>
  )
};

export default memo(Progressbar);
