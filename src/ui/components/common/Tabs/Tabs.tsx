import { ReactNode, useState } from "react"
import Box from "../Box/Box";

export type TabsProps = {
  items: Record<string, ReactNode>
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
      { keys.map((key) => (
        <button style={{ background: current === key ? "red" : undefined}} key={key} onClick={() => handleTabChange(key)}>{ key }</button>
      ))}
      { items[current] }
    </Box>
  );
}
