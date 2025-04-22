import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage'
import StatList from '@/components/statistics/StatList/StatList';
import { SiteTime } from '@/storage/types';
import '@/App.css'

function App() {
  const [getStorage] = useLocalStorage("siteTimes");
  const [state, setState] = useState<SiteTime[]>([]);

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getTimeIntervals = async () => {
      const times = await getStorage();
      // const times = (await getStorage()).map(({ url, startTime, endTime }) => `
      //   ${URLFacade(url).hostname}: ${dayjs(startTime).toDateTime()}-${dayjs(endTime).toDateTime()}
      // `);
      // console.log(times);
      setState(times);
    }

    getTimeIntervals();
  }, []);
  
  return (
    <>
      <p>Статистика времени, проведенного на сайтах:</p>
      <StatList items={state} />
    </>
  )
}

export default App
