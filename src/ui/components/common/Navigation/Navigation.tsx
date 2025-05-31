import { ReactNode, useState } from "react";
import Box from "@/ui/components/common/Box/Box";
import './Navigation.css';

export type NavigationProps = {
  items: Record<string, {
    title: string;
    render: () => ReactNode;  
  }>;
  bottomSlotRender?: () => ReactNode;
}

export default function Navigation({
  items,
  bottomSlotRender,
}: NavigationProps) {
  const keys = Object.keys(items);
  const [current, setCurrent] = useState(keys[0]);

  const handleNavigationChange = (key: string) => {
    setCurrent(key);
  };
  
  return (
    <Box className="navigation__container">
      <div className="navigation__buttons">
        <div className="navigation__tabs">
          { Object.entries(items).map(([key, { title }]) => (
            <button 
              key={key} 
              className={`navigation__tab ${current === key ? 'navigation__tab--current' : ''}`}
              onClick={() => handleNavigationChange(key)}
            >
              { title }
            </button>
          ))}
        </div>
        <div className="navigation__extra">
          { bottomSlotRender?.() }
        </div>
      </div>
      <div className="navigation__content">
        { items[current].render() }
      </div>
    </Box>
  );
}
