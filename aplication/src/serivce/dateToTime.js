export const dateToTime = (date) => {
  const time = new Date(date);
  return `${time.getFullYear()}.${
    time.getMonth() + 1
  }.${time.getDate()}  ${time.getHours()}:${time.getMinutes()}`;
};
