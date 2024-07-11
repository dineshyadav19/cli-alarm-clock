import { rl } from "../interface/readline";
import { AlarmService } from "../services/alarm-service";
import { messages } from "../utils/messages";

export class AlarmController {
  private alarmService: AlarmService;

  constructor(alarmService: AlarmService) {
    this.alarmService = alarmService;
  }

  public showMenu() {
    [
      "\n1. Display Current Time",
      "2. Show Alarms",
      "3. Add Alarm",
      "4. Snooze Alarm",
      "5. Delete Alarm",
      "6. Exit",
    ].forEach((option) => console.log(`${option}`));

    rl.question(messages.chooseOption, (option) => {
      switch (option) {
        case "1":
          this.alarmService.displayCurrentTime();
          this.showMenu();
          break;
        case "2":
          this.alarmService.showAlarms();
          this.showMenu();
          break;
        case "3":
          this.addAlarm();
          break;
        case "4":
          this.alarmService.snoozeRingingAlarm();
          this.showMenu();
          break;
        case "5":
          this.deleteAlarm();
          break;
        case "6":
          console.log(messages.exit);
          rl.close();
          process.exit(0);
        default:
          console.log(messages.invalidOption);
          this.showMenu();
          break;
      }
    });
  }

  private addAlarm() {
    rl.question(messages.enterAlarmTime, (time) => {
      if (time.toLowerCase() === "cancel") {
        this.showMenu();
        return;
      }
      rl.question(messages.enterAlarmDay, (day) => {
        if (day.toLowerCase() === "cancel") {
          this.showMenu();
          return;
        }
        this.alarmService.addAlarm(time, day);
        this.showMenu();
      });
    });
  }

  private deleteAlarm() {
    this.alarmService.showAlarms();
    rl.question(messages.enterAlarmToDelete, (num) => {
      if (num.toLowerCase() === "cancel") {
        this.showMenu();
        return;
      }
      const index = parseInt(num) - 1;
      this.alarmService.selectAndDeleteAlarm(index);
      this.showMenu();
    });
  }
}
