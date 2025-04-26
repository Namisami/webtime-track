import { ActiveTab } from "@/entities/tab";
import { windows } from "webextension-polyfill";

const { WINDOW_ID_NONE } = windows;

export default async function handleFocusChanged(windowId: number) {
  console.log("FOCUS CHANGED", windowId);
  if (windowId === WINDOW_ID_NONE) {
    await ActiveTab.stopActiveTimer();
  } else if (windowId === ActiveTab.getInstance().windowId) {
    await ActiveTab.startActiveTimer();
  }
}
