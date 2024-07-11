import { AlarmController } from "./controllers/alarm-controller";
import { AlarmService } from "./services/alarm-service";

const app = () => {
  const alarmService = new AlarmService();
  const alarmController = new AlarmController(alarmService);
  alarmService.setController(alarmController);
  alarmController.showMenu();
};

app();
