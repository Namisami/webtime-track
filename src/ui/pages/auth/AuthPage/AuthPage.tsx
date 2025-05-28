import Tabs from "@/ui/components/common/Tabs/Tabs";
import { authItems } from "@/ui/pages/auth/const";

export default function AuthPage() {
  return (
    <Tabs items={ authItems }/>
  )
}
