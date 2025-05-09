import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage'
import StatList from '@/ui/components/statistics/StatList/StatList';
import LocalStorage from '@/core/storage/types';
import '@/App.css'
import Browser from 'webextension-polyfill';

function App() {
  const [getStorage] = useLocalStorage("statistics");
  const [state, setState] = useState<LocalStorage["statistics"]>({});

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getStatistics = async () => {
      const statistics = await getStorage();
      setState(statistics);
    }

    Browser.storage.onChanged.addListener(getStatistics);
    return () => {
      Browser.storage.onChanged.removeListener(getStatistics);
    };
  }, [getStorage]);
  
  return (
    <>
      <p>Статистика времени, проведенного на сайтах:</p>
      <StatList items={state} />
    </>
  )
}

export default App
