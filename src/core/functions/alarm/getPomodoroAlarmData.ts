import { PomodoroStatus } from "@/core/entities/alarms/PomodoroAlarm";

export default function getPomodoroAlarmData(name: string) {
  const [alarmName, alarmType, alarmCount] = name.split("$");
  return {
    alarmName,
    alarmType: alarmType as PomodoroStatus,
    alarmCount: Number(alarmCount),
  }
}
