import dayjs from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    toTime(): string;
  }
}

export const extendDayjsPlugin = () => {
  dayjs.extend((o, c) => {
    c.prototype.toTime = function () {
      return this.utc().format("HH:mm:ss")
    };
  });
};
