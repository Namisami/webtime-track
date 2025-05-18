import Browser from "webextension-polyfill";

export class Alarm {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  startTimer(type: string, repeat: number, duration: number) {
    Browser.alarms.create(`${this.name}$${type}$${repeat}`, { delayInMinutes: duration / 60 });
  }
}
