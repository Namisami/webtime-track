import Navigation, { NavigationProps } from '@/ui/components/common/Navigation/Navigation';
import { briefStatisticsPageItems } from '@/const';
import Tabs from '@/ui/components/common/Tabs/Tabs';
import SettingsPage from './ui/pages/SettingsPage/SettingsPage';

const items: NavigationProps["items"] = {
  "dashboard": {
    title: "Дашборд",
    render: () => <Tabs items={ briefStatisticsPageItems } />
  },
  "settings": {
    title: "Настройки",
    render: () => <SettingsPage />
  },
}

function AppExtension() {
  return (
    <>
      <Navigation items={ items }/>
    </>
  )
}

export default AppExtension
