import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage'
import StatList from '@/ui/components/statistics/StatList/StatList';
import LocalStorage from '@/core/storage/types';
import '@/App.css'

function App() {
  const [getStorage] = useLocalStorage("statistics");
  const [state, setState] = useState<LocalStorage["statistics"]>({});

  console.log("RENDER")
  useEffect(() => {
    console.log("USE EFFECT")
    const getStatistics = () => {
      new Promise(resolve => setTimeout(resolve, 50))
        .then(() => {
          getStorage()
            .then((statistics) => {
              console.log(statistics);
              setState(statistics);
            });
        });
    };

    // TODO вызывать только когда обновляется необходимое поле.
    getStatistics();
  }, [getStorage]);
  
  return (
    <>
      <p>Статистика времени, проведенного на сайтах:</p>
      <StatList items={state} />
    </>
  )
}

export default App
