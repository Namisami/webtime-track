import { ActiveTab } from "@/core/entities/tab";
import { Idle } from "webextension-polyfill"

export default async function handleStateChanged(newState: Idle.IdleState) {
  console.log("STATE CHANGED", newState);
  switch (newState) {
    case "idle":
    case "locked":
      await ActiveTab.stopActiveTimer();
      break;
    case "active":
      await ActiveTab.startActiveTimer();
  }
};
