import '@/App.css'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

function App() {
  const [getStorage, setStorage] = useLocalStorage("siteTimes");
  const [state, setState] = useState<string[]>();

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getTimeIntervals = async () => {
      const times = (await getStorage()).map(({ url, startTime, endTime }) => `
        ${url}: ${dayjs(startTime).toDateTime()}-${dayjs(endTime).toDateTime()}
      `);
      console.log(times);
      setState(times);
    }

    getTimeIntervals();
  }, []);
  
  return (
    <>
      Статистика времени, проведенного на сайтах:
      { state }
    </>
  )
}

export default App
