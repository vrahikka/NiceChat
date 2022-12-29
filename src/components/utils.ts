export const getTime = (timeStamp?: Date) => {
  if (!timeStamp) return "";
  const clock = `${timeStamp.getHours()}.${timeStamp.getMinutes()}:${timeStamp.getSeconds()}`;
  if (timeStamp.getDate() === new Date(Date.now()).getDate()) return `Today, ${clock}`;
  return `${timeStamp.getDate()}.${timeStamp.getMonth()}, ${clock}`;
};
