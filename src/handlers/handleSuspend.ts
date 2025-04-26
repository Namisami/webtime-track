import { ActiveTab } from "@/entities/tab";
import { getActiveTab } from "@/functions/tab";

export default async function handleSuspend() {
  console.warn("SUSPEND");
  const tab = await getActiveTab();
  if (!tab.url) return;

  if (ActiveTab.getInstance()) {
    await ActiveTab.getInstance().stopTimer();
  }
}
