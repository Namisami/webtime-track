import Browser from "webextension-polyfill";
import { Alarm } from "@/core/entities/alarm";
import { getLocalStorageByParams } from "@/core/storage/helper";

export type PomodoroStatus = "WORK" | "SHORT_BREAK" | "LONG_BREAK";

export const POMODORO_NOTIFICATION = "POMODORO_NOTIFICATION";

export const POMODORO_STATUSES: Record<PomodoroStatus, PomodoroStatus> = {
  WORK: "WORK",
  SHORT_BREAK: "SHORT_BREAK",
  LONG_BREAK: "LONG_BREAK",
};

async function showWorkNotification() {
  const pomodoroSettings = await getLocalStorageByParams("pomodoro");
  await Browser.notifications.create(
    POMODORO_NOTIFICATION,
    {
      message: `Отдых окончен, пришло время поработать в течение ${pomodoroSettings.workDuration / 60} минут!`,
      title: `Пора за работу`,
      type: "basic",
      iconUrl: "images/icon32.png"
    }
  )
}

async function showShortBreakNotification() {
  const pomodoroSettings = await getLocalStorageByParams("pomodoro");
  await Browser.notifications.create(
    POMODORO_NOTIFICATION,
    {
      message: `Пора сворачивать работу, передохните немного! У вас есть ${pomodoroSettings.shortBreak / 60} минут, чтобы заварить чай.`,
      title: "Можно расслабиться",
      type: "basic",
      iconUrl: "images/icon32.png"
    }
  )
}

async function showLongBreakNotification() {
  const pomodoroSettings = await getLocalStorageByParams("pomodoro");
  await Browser.notifications.create(
    POMODORO_NOTIFICATION,
    {
      message: `После хорошей работы можно позволить себе отдохнуть и подольше, у вас есть целых ${pomodoroSettings.longBreak / 60} минут.`,
      title: "Вы очень хорошо поработали",
      type: "basic",
      iconUrl: "images/icon32.png"
    }
  )
}

export class PomodoroAlarm {
  static instance: Alarm = new Alarm("pomodoro");
  
  static async start(type: PomodoroStatus, repeat: number) {
    const pomodoroSettings = await getLocalStorageByParams("pomodoro");
    PomodoroAlarm.instance.startTimer(type, repeat, pomodoroSettings.workDuration);
  }

  static async end(type: PomodoroStatus, repeat: number) {
    const pomodoroSettings = await getLocalStorageByParams("pomodoro");

    if (type === POMODORO_STATUSES.WORK) {
      if (repeat === pomodoroSettings.repeats) {
        PomodoroAlarm.instance.startTimer(POMODORO_STATUSES.LONG_BREAK, repeat, pomodoroSettings.longBreak);
        await showLongBreakNotification();
      } else {
        PomodoroAlarm.instance.startTimer(POMODORO_STATUSES.SHORT_BREAK, repeat, pomodoroSettings.shortBreak);
        await showShortBreakNotification();
      }
    } else if (type === POMODORO_STATUSES.SHORT_BREAK) {
      PomodoroAlarm.instance.startTimer(POMODORO_STATUSES.WORK, repeat + 1, pomodoroSettings.workDuration);
      await showWorkNotification();
    } else if (type === POMODORO_STATUSES.LONG_BREAK) {
      PomodoroAlarm.instance.startTimer(POMODORO_STATUSES.WORK, 1, pomodoroSettings.workDuration);
      await showWorkNotification();
    }
  }

  static async stop() {
    await Browser.alarms.clearAll();
  }
}
