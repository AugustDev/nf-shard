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

export const formatDuration = (ms: number) => {
  const duration = moment.duration(ms);

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let result = "";

  // Append hours if present
  if (hours) result += `${hours}h `;

  // Append minutes if present, or if hours were present (to ensure "0min" in "1h 0min")
  if (minutes || hours) result += `${minutes}min `;

  // Append seconds if hours and minutes aren't present, or if only seconds exist
  if ((!hours && !minutes) || !ms) result += `${seconds} sec`;

  return result.trim(); // trim removes the trailing space, if any
};
