import dayjs from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    toDateTime(): string;
  }
}

export const extendDayjsPlugin = () => {
  dayjs.extend((o, c) => {
    c.prototype.toDateTime = function () {
      return this.format("HH:mm:ss")
    };
  });
};
