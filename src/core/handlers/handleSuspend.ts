import { ActiveTab } from "@/core/entities/tab";
import { getActiveTab } from "@/core/functions/tab";

export default async function handleSuspend() {
  console.warn("SUSPEND");
  const tab = await getActiveTab();
  if (!tab.url) return;

  if (ActiveTab.getInstance()) {
    await ActiveTab.getInstance().stopTimer();
  }
}
