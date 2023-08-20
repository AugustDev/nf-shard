import moment from "moment";

export const fullDateTime = (date?: Date | null) => {
  if (!date) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD HH:mm");
};

export const safeDiffMinutes = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) {
    return "";
  }

  return `Duration: ${moment(date2).diff(moment(date1), "minutes")} min`;
};
