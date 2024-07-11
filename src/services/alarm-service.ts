import { Alarm } from "../models/alarm";
import moment from "moment";
import { rl } from "../interface/readline";
import { messages } from "../utils/messages";
import { formatDayTime } from "../utils/time-utils";

export class AlarmService {
  private alarms: Map<string, Alarm>;
  private snoozedAlarms: Map<string, number>;
  private alarmController: any;
  private ringingAlarmKey: string | null = null;

  constructor() {
    this.alarms = new Map<string, Alarm>();
    this.snoozedAlarms = new Map<string, number>();
    setInterval(() => this.checkAlarms(), 1000);
  }

  public setController(controller: any) {
    this.alarmController = controller;
  }

  public displayCurrentTime() {
    console.log(`${messages.currentTime}${moment().format("dddd, HH:mm:ss")}`);
  }

  public showAlarms() {
    if (this.alarms.size === 0) {
      console.log(messages.noAlarms);
    } else {
      console.log(messages.currentAlarms);
      let index = 1;
      for (const key of this.alarms.keys()) {
        console.log(`${index}. ${key}`);
        index++;
      }
    }
  }

  public addAlarm(time: string, day?: string): void {
    const { formatDay, formatTime } = formatDayTime();
    const formattedTime = formatTime(time);
    const formattedDay = formatDay(day || moment().format("dddd"));

    if (!formattedTime) {
      console.log(messages.invalidTimeFormat);
      return;
    }

    const alarmKey = `${formattedDay}-${formattedTime}`;
    if (!this.alarms.has(alarmKey)) {
      this.alarms.set(alarmKey, new Alarm(formattedTime));
      console.log(messages.alarmSet(formattedDay, formattedTime));
    } else {
      console.log(messages.alarmExists(formattedDay, formattedTime));
    }
  }

  public deleteAlarm(alarmKey: string) {
    if (this.alarms.delete(alarmKey)) {
      console.log(messages.alarmDeleted(alarmKey));
      this.snoozedAlarms.delete(alarmKey);
    } else {
      console.log(messages.alarmNotFound(alarmKey));
    }
  }

  private checkAlarms() {
    const currentTime = moment();
    const currentDay = currentTime.format("dddd");
    const currentHourMinute = currentTime.format("HH:mm");

    for (const [key, alarm] of this.alarms.entries()) {
      if (this.snoozedAlarms.has(key)) {
        continue;
      }
      const [alarmDay, alarmTime] = key.split("-");
      if (alarmDay === currentDay && alarmTime === currentHourMinute) {
        console.log(messages.ringingAlarm(alarmDay, alarmTime));
        this.ringingAlarmKey = key;
        this.handleRingingAlarm(alarm, alarmDay, alarmTime);
      }
    }
  }

  public selectAndDeleteAlarm(index: number) {
    const alarmKeys = Array.from(this.alarms.keys());
    if (index >= 0 && index < alarmKeys.length) {
      this.deleteAlarm(alarmKeys[index]);
    } else {
      console.log(messages.invalidSelection);
    }
  }

  private handleRingingAlarm(alarm: Alarm, day: string, time: string) {
    setTimeout(() => {
      rl.question(messages.snoozeOrStop, (answer) => {
        if (answer.toLowerCase() === "snooze") {
          this.snoozeRingingAlarm();
        } else if (answer.toLowerCase() === "stop") {
          this.deleteAlarm(`${day}-${time}`);
        } else {
          console.log(messages.invalidOption);
        }
        this.ringingAlarmKey = null;
        this.alarmController.showMenu();
      });
    }, 500);
  }

  public snoozeRingingAlarm() {
    if (this.ringingAlarmKey) {
      const alarm = this.alarms.get(this.ringingAlarmKey);
      if (alarm) {
        const snoozeCount = this.snoozedAlarms.get(this.ringingAlarmKey) || 0;
        if (snoozeCount < 3) {
          console.log(messages.alarmSnoozed);
          this.snoozedAlarms.set(this.ringingAlarmKey, snoozeCount + 1);
          setTimeout(() => {
            this.snoozedAlarms.delete(this.ringingAlarmKey!);
          }, 30 * 1000);
        } else {
          console.log(messages.cannotSnooze);
        }
      }
    }
  }
}
