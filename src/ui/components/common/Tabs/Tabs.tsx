import { ReactNode, useState } from "react";
import Box from "@/ui/components/common/Box/Box";
import './Tabs.css';

export type TabsProps = {
  items: Record<string, {
    title: string;
    render: () => ReactNode;  
  }>;
}

export default function Tabs({
  items
}: TabsProps) {
  const keys = Object.keys(items);
  const [current, setCurrent] = useState(keys[0]);

  const handleTabChange = (key: string) => {
    setCurrent(key);
  };
  
  return (
    <Box className="tabs__container">
      <div className="tabs__buttons">
        { Object.entries(items).map(([key, { title }]) => (
          <button 
            key={key} 
            className={`tabs__tab ${current === key ? 'tabs__tab--current' : ''}`}
            onClick={() => handleTabChange(key)}
          >
            { title }
          </button>
        ))}
      </div>
      { items[current].render() }
    </Box>
  );
}
