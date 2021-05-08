export const formatDate = timestampWithTimezone => {
  const date = new Date(timestampWithTimezone);

  const fullMonth = date.getMonth();
  const month = fullMonth + 1 < 10 ? `0${fullMonth + 1}` : fullMonth + 1;
  const fullDay = date.getDate();
  const day = fullDay < 10 ? `0${fullDay}` : fullDay;

  return `${day}/${month}/${date.getFullYear()}`;
}