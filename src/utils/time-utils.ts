import moment from "moment";

export const formatCurrentTime = (): string => {
  return moment().format("dddd, HH:mm:ss");
};

export const formatDayTime = () => {
  const momentTimeFormat = "HH:mm";
  const momentDayFormat = "dddd";

  const formatTime = (time: string) =>
    moment(time, momentTimeFormat).isValid()
      ? moment(time, momentTimeFormat).format(momentTimeFormat)
      : null;

  const formatDay = (day: string) =>
    moment(day, momentDayFormat).isValid()
      ? moment(day, momentDayFormat).format(momentDayFormat)
      : moment().format(momentDayFormat);

  return {
    formatTime,
    formatDay,
  };
};
