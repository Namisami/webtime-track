import browser from "webextension-polyfill";
import './App.css'
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      setState((state) => state + 1);
    }, 1000);
    
    browser.runtime.sendMessage({ type: "getTime"});
  }, []);

  return (
    <>
      <p>dasa</p>
      { state }
    </>
  )
}

export default App
