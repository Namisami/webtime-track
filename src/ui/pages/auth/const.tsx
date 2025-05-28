import { TabsProps } from "@/ui/components/common/Tabs/Tabs";
import LoginPage from "@/ui/pages/auth/LoginPage/LoginPage";
import RegisterPage from "@/ui/pages/auth/RegisterPage/RegisterPage";

export const authItems: TabsProps["items"] = {
  "login": {
    title: "Войти",
    render: () => <LoginPage />
  },
  "register": {
    title: "Зарегистрироваться",
    render: () => <RegisterPage />
  },
};
