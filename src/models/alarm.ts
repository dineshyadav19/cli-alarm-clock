import moment from "moment";

export class Alarm {
  private alarmTime: moment.Moment;
  private snoozeCount: number;

  constructor(alarmTime: string) {
    this.alarmTime = moment(alarmTime, "HH:mm");
    this.snoozeCount = 0;
  }

  public getAlarmTime(): moment.Moment {
    return this.alarmTime;
  }

  public snooze(): boolean {
    if (this.snoozeCount < 3) {
      this.alarmTime.add(30, "seconds");
      this.snoozeCount++;
      return true;
    }
    return false;
  }

  public resetSnoozeCount() {
    this.snoozeCount = 0;
  }
}
