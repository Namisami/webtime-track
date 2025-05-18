import { POMODORO_NOTIFICATION } from "@/core/entities/alarms/PomodoroAlarm";
import Browser from "webextension-polyfill";

export default async function getPomodoroAlarm() {
  return (await Browser.notifications.getAll())[POMODORO_NOTIFICATION];
}
