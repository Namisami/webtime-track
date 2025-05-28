import Browser from "webextension-polyfill";
import LocalStorage from "@/core/storage/types";
import dayjs from "@/plugins/dayjs";

export default async function initializeStorage() {
  const storage: Record<string, unknown> = {
    siteTimes: [],
    statistics: {},
    date: dayjs().formatServer(),
    token: '',

    // Pomodoro
    pomodoro: {
      workDuration: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
      repeats: 4,
      on: false,
    },
  } satisfies LocalStorage;

  await Browser.storage.local.set(storage);
}