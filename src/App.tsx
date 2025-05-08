import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage'
import StatList from '@/ui/components/statistics/StatList/StatList';
import { SiteTime } from '@/core/storage/types';
import '@/App.css'

function App() {
  const [getStorage] = useLocalStorage("siteTimes");
  const [state, setState] = useState<SiteTime[]>([]);

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getTimeIntervals = async () => {
      const times = await getStorage();
      setState(times);
    }

    getTimeIntervals();
  }, [getStorage]);
  
  return (
    <>
      <p>Статистика времени, проведенного на сайтах:</p>
      <StatList items={state} />
    </>
  )
}

export default App
