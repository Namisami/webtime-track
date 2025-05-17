import dayjsLib, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

declare module 'dayjs' {
  interface Dayjs {
    toTime(): string;
    formatServer(): string;
  }
}

const extendDayjsPlugin = () => {
  dayjsLib.extend((o, c) => {
    c.prototype.toTime = function (this: Dayjs) {
      return this.utc().format("HH:mm:ss");
    };
    
    c.prototype.formatServer = function (this: Dayjs) {
      return this.format("YYYY-MM-DD");
    };
  });
};

dayjsLib.extend(utc);
dayjsLib.extend(timezone);
dayjsLib.extend(extendDayjsPlugin);
dayjsLib.tz.setDefault("Europe/Moscow");

// const dayjs = dayjs.tz;

export default dayjsLib.tz;
