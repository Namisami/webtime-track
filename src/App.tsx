import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage'
import StatList from '@/ui/components/statistics/StatList/StatList';
import LocalStorage from '@/core/storage/types';
import './App.css'
import PieChart from './ui/components/statistics/PieChart/PieChart';
import { objectToArray } from './utils/objects';
import axios from 'axios';

function App() {
  const [getStorage] = useLocalStorage("statistics");
  const [getIntervals] = useLocalStorage("siteTimes");

  const [state, setState] = useState<LocalStorage["statistics"]>({});

  useEffect(() => {
    const getStatistics = () => {
      new Promise(resolve => setTimeout(resolve, 50))
        .then(() => {
          getStorage()
            .then((statistics) => {
              setState(statistics);
            });
        });
    };

    // TODO вызывать только когда обновляется необходимое поле.
    getStatistics();
  }, [getStorage]);
  
  const handleSend = async () => {
    const intervals = await getIntervals();
    axios
      .post('http://localhost:8000/api/create_intervals/', { intervals })
      .then(console.log)
      .catch(console.log)
  }

  return (
    <>
      <h1>Статистика времени, проведенного на сайтах</h1>
      <button onClick={handleSend}>ОТПРАВИТЬ</button>
      <PieChart data={objectToArray(state, "url")} />
      <StatList items={state} />
    </>
  )
}

export default App
