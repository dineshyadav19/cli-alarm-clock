export const messages = {
  currentTime: "Current Time: ",
  alarmSet: (day: string, time: string) => `Alarm set for ${day} at ${time}`,
  alarmExists: (day: string, time: string) =>
    `Alarm for ${day} at ${time} already exists.`,
  alarmDeleted: (key: string) => `Alarm for ${key} deleted.`,
  alarmNotFound: (key: string) => `No alarm found for ${key}.`,
  noAlarms: "No alarms set.",
  currentAlarms: "Current Alarms:",
  invalidOption: "Invalid option. Please try again.",
  enterAlarmTime:
    "Enter alarm time in 24hr format or type 'cancel' to return to the main menu: ",
  enterAlarmDay:
    "Enter day of the week or type 'cancel' to return to the main menu: ",
  chooseOption: "Choose an option: ",
  invalidTimeFormat: "Invalid time format. Please enter time in HH:mm format.",
  ringingAlarm: (day: string, time: string) =>
    `ALARM RINGING for ${day} at ${time}`,
  snoozeOrStop: "Do you want to snooze or stop it? (snooze/stop): ",
  alarmSnoozed: "Alarm snoozed for 30 seconds.",
  cannotSnooze: "Cannot snooze the alarm anymore.",
  enterAlarmToDelete:
    'Enter the number of the alarm you want to delete (or type "cancel" to return to the main menu): ',
  invalidSelection: "Invalid selection.",
  exit: "Exiting the program...",
};
