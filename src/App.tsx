import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage'
import StatList from '@/ui/components/statistics/StatList/StatList';
import '@/App.css'
import LocalStorage from './core/storage/types';

function App() {
  const [getStorage] = useLocalStorage("statistics");
  const [state, setState] = useState<LocalStorage["statistics"]>({});

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getTimeIntervals = async () => {
      const statistics = await getStorage();
      setState(statistics);
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
