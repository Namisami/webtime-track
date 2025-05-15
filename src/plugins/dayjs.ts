import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

declare module 'dayjs' {
  interface Dayjs {
    toTime(): string;
    formatServer(): string;
  }
}

const extendDayjsPlugin = () => {
  dayjs.extend((o, c) => {
    c.prototype.toTime = function (this: Dayjs) {
      return this.utc().format("HH:mm:ss");
    };
    
    c.prototype.formatServer = function (this: Dayjs) {
      return this.utc().format("YYYY-MM-DD");
    };
  });
};

export default function initDayjsLoad() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(extendDayjsPlugin);
  dayjs.tz.setDefault("Europe/Moscow");
}
