import { Alarms } from "webextension-polyfill";
import { PomodoroAlarm } from "@/core/entities/alarms/PomodoroAlarm";
import { getPomodoroAlarmData } from "@/core/functions/alarm";

export default async function handleAlarm({ name }: Alarms.Alarm) {
  console.log("ALARM", name);
  const { alarmCount, alarmType } = getPomodoroAlarmData(name);
  await PomodoroAlarm.end(alarmType, alarmCount);
}
