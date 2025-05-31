import Navigation, { NavigationProps } from '@/ui/components/common/Navigation/Navigation';
import { briefStatisticsPageItems } from '@/const';
import Tabs from '@/ui/components/common/Tabs/Tabs';
import SettingsPage from '@/ui/pages/SettingsPage/SettingsPage';
import Button from '@/ui/components/common/Button/Button';
import { useLocalStorage } from '@/ui/hooks/useLocalStorage';
import removeCurrentTab from '@/core/functions/tab/removeCurrentTab';
import './AppExtension.css';

const items: NavigationProps["items"] = {
  "dashboard": {
    title: "Дашборд",
    render: () => <Tabs 
      className='app-extension__brief'
      items={ briefStatisticsPageItems } 
    />
  },
  "settings": {
    title: "Настройки",
    render: () => <SettingsPage />
  },
}

function AppExtension() {
  const [, setToken] = useLocalStorage("token");

  const handleExit = async () => {
    await setToken("");
    await removeCurrentTab();
  };

  return (
    <Navigation 
      items={ items }
      bottomSlotRender={() => (
        <Button
          className='app-extension__exit'
          onClick={handleExit}
        >
          Выйти
        </Button>
      )}
    />
  )
}

export default AppExtension
